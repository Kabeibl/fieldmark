// Cloudflare Worker — CORS proxy for Metsäkeskus WFS
// Deploy: wrangler deploy  (from this directory)
// Then paste the worker URL into PROXY_URL in index.html

const WFS_BASE = "https://avoin.metsakeskus.fi/rajapinnat/v1/stand/ows";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const params = new URL(request.url).search;
    const res = await fetch(WFS_BASE + params, {
      headers: { Accept: "application/json" },
    });

    const body = await res.arrayBuffer();

    return new Response(body, {
      status: res.status,
      headers: {
        ...CORS,
        "Content-Type": res.headers.get("Content-Type") ?? "application/json",
        "Cache-Control": "public, max-age=1800",
      },
    });
  },
};
