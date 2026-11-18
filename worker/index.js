// Serves the static export in ./out (next build with output: "export").
// A static export has no server, so this Worker does what Vercel did:
// - uitwijken.com goes to www.uitwijken.com with a 308, path and query kept;
// - a trailing slash goes to the path without it with a 308 (relative Location);
// - /docs/<slug> matches the slug without regard to case, as readDoc does;
// - a direct request for a .html file is a 404, as on Vercel.
const CANONICAL_HOST = "www.uitwijken.com";

// Vercel's redirect: text/plain body "Redirecting..." with a Refresh header.
function redirect(location) {
  return new Response("Redirecting...", {
    status: 308,
    headers: { Location: location, Refresh: `0;url=${location}`, "Content-Type": "text/plain" },
  });
}

// The asset server sends text/html and text/plain without a charset. Vercel sent utf-8.
function withCharset(response) {
  const type = response.headers.get("Content-Type");
  if (!type || !/^text\/(html|plain)$/.test(type)) return response;
  const res = new Response(response.body, response);
  res.headers.set("Content-Type", `${type}; charset=utf-8`);
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "uitwijken.com") {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      return redirect(url.toString());
    }

    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      return redirect((url.pathname.replace(/\/+$/, "") || "/") + url.search);
    }

    // Unknown path: the asset server answers with out/404.html.
    if (url.pathname.endsWith(".html")) {
      url.pathname = "/_404";
      return withCharset(await env.ASSETS.fetch(new Request(url, request)));
    }

    if (url.pathname.startsWith("/docs/") && url.pathname !== url.pathname.toLowerCase()) {
      url.pathname = url.pathname.toLowerCase();
      return withCharset(await env.ASSETS.fetch(new Request(url, request)));
    }

    return withCharset(await env.ASSETS.fetch(request));
  },
};
