import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConfig, createLog } from "../api";

export default function LogFormPage() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getConfig()
      .then(setConfig)
      .catch((e) => setMsg({ type: "error", text: e.message }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!config) {
      return setMsg({ type: "error", text: "Config not loaded" });
    }

    const val = Number(celsius);
    if (Number.isNaN(val)) {
      return setMsg({ type: "error", text: "Plese enter a number." });
    }

    setLoading(true);

    try {
      await createLog({
        drone_id: config.drone_id,
        drone_name: config.drone_name,
        country: config.country,
        celsius: val,
      });

      setMsg({ type: "success", text: "Log created successfully!" });
      setCelsius("");

      setTimeout(() => navigate("/logs"), 800);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white rounded-md shadow-md p-6">
      <h1 className="text-3xl text-pink-400 mb-4"> ❀ Add Temperature Log ❀</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-pink-400 text-l font-small">Celsius</label>
          <input
            type="number"
            step="1"
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            className="mt-2 p-3 border bg-pink-50 rounded w-full focus:ring-2 focus:ring-brand-400"
            placeholder="ex. 44"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 bg-pink-300 text-white rounded hover:bg-pink-400 disabled:opacity-50 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>

        {msg && (
          <div
            className={`${
              msg.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {msg.text}
          </div>
        )}

        <div className="text-sm text-gray-500">
          Drone:{" "}
          {config
            ? `${config.drone_name} (${config.drone_id})`
            : "Loading config..."}
        </div>
      </form>
    </section>
  );
}