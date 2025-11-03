import { useEffect, useState } from "react";
import { getConfig, getStatus } from "../api";

export default function ConfigPage() {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getConfig().then(data => { if(mounted) setConfig(data) }).catch(e=>setError(e.message));
    getStatus().then(data => { if(mounted) setStatus(data) }).catch(()=>{});
    return ()=> mounted = false;
  },[]);

  if (error) return <div className="p-6 bg-red-50 text-red-700 rounded">{error}</div>;
  if (!config) return <div className="p-6 text-center text-gray-600 font-medium">Loading config...</div>;

  return (
    <section className="bg-white rounded-md shadow-md p-6">
      <h1 className="text-2xl text-pink-400 font-bold mb-4">Drone Config</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-pink-100 rounded">
          <div className="text-sm text-gray-500">Drone ID</div>
          <div className="text-lg font-medium text-gray-700">{config.drone_id}</div>
        </div>
        <div className="p-4 bg-pink-100 rounded">
          <div className="text-sm text-gray-500">Drone Name</div>
          <div className="text-lg font-medium text-gray-700">{config.drone_name}</div>
        </div>
        <div className="p-4 bg-pink-100 rounded">
          <div className="text-sm text-gray-500">Light</div>
          <div className="text-lg font-medium text-gray-700">{config.light}</div>
        </div>
        <div className="p-4 bg-pink-100 rounded">
          <div className="text-sm text-gray-500">Country</div>
          <div className="text-lg font-medium text-gray-700">{config.country}</div>
        </div>
      </div>

      {status && (
        <div className="mt-4 text-sm">
          <span className="font-medium font-semibold text-gray-700">Condition:</span> {status.condition}
        </div>
      )}
    </section>
  );
}
