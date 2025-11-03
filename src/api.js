// src/api.js
console.log("🚀 Loaded api.js from:", window.location.href);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DRONE_ID = import.meta.env.VITE_DRONE_ID;

console.log("✅ API base:", BASE_URL, "Drone ID:", DRONE_ID);

async function parseRes(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function getConfig() {
  const res = await fetch(`${BASE_URL}/configs/${DRONE_ID}`);
  if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
  return parseRes(res);
}

export async function getStatus() {
  const res = await fetch(`${BASE_URL}/status/${DRONE_ID}`);
  if (!res.ok) throw new Error(`Status fetch failed: ${res.status}`);
  return parseRes(res);
}

export async function getLogs() {
  const res = await fetch(`${BASE_URL}/logs/${DRONE_ID}`);
  if (!res.ok) throw new Error(`Logs fetch failed: ${res.status}`);
  const data = await parseRes(res);

  // ✅ รองรับโครงสร้างที่มี { items: [...] }
  const logs = Array.isArray(data)
    ? data
    : Array.isArray(data.items)
    ? data.items
    : [];

  return logs.sort((a, b) => new Date(b.created) - new Date(a.created));
}


export async function createLog(payload) {
  const res = await fetch(`${BASE_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await parseRes(res);
    throw new Error(typeof err === "string" ? err : JSON.stringify(err));
  }
  return parseRes(res);
}
