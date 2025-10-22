import fetch from "node-fetch";
const endpoint = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/generate`
  : "http://localhost:3000/api/generate";

(async () => {
  console.log("🔁 Triggering daily news generation...");
  const res = await fetch(endpoint);
  const data = await res.json();
  console.log("✅ Done:", data);
})();
