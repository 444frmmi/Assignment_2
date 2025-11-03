import React, { useEffect, useState } from "react";
import { getLogs } from "../api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const data = await getLogs();
        setLogs(data);
      } catch (err) {
        console.error("❌ Error fetching logs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  const totalPages = Math.ceil(logs.length / perPage);
  const startIdx = (page - 1) * perPage;
  const currentPageLogs = logs.slice(startIdx, startIdx + perPage);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        Loading logs...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-400 font-semibold">
        Error loading logs: {error}
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
        ❤︎ Drone Logs Dashboard ❤︎
      </h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-white">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-center p-6">No logs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-pink-200 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Country</th>
                  <th className="p-3 text-left">Drone ID</th>
                  <th className="p-3 text-left">Drone Name</th>
                  <th className="p-3 text-left">Celsius</th>
                </tr>
              </thead>
              <tbody>
                {currentPageLogs.map((log, idx) => (
                  <tr
                    key={log._id || idx}
                    className={`border-b transition-colors duration-150 ${
                      log.celsius > 40
                        ? "bg-pink-100 text-gray-700"
                        : "hover:bg-pink-50"
                    }`}
                  >
                    <td className="p-3">
                      {new Date(log.created).toLocaleString()}
                    </td>
                    <td className="p-3">{log.country}</td>
                    <td className="p-3">{log.drone_id}</td>
                    <td className="p-3">{log.drone_name}</td>
                    <td className="p-3 font-semibold">{log.celsius}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {logs.length > perPage && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg transition shadow-md ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-pink-300 hover:bg-pink-400 text-white"
            }`}
          >
            ◀ Prev
          </button>
          <span className="text-pink-400 font-medium">
            Page <strong>{page}</strong> / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg transition shadow-md ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-pink-300 hover:bg-pink-400 text-white"
            }`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
