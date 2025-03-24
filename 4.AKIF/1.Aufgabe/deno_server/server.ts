import { serve } from "https://deno.land/std/http/server.ts";
import { join } from "https://deno.land/std/path/mod.ts";

const PORT = 8000;
const HOST = "0.0.0.0"; // Allow external access

console.log(`Server is starting at http://${HOST}:${PORT}/`);

serve(async (req) => {
  const url = new URL(req.url);

  // Serve index.html
  if (url.pathname === "/") {
    const html = await Deno.readTextFile(join(Deno.cwd(), "index.html"));
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
  }

  // Serve style.css
  if (url.pathname === "/style.css") {
    const css = await Deno.readTextFile(join(Deno.cwd(), "style.css"));
    return new Response(css, { status: 200, headers: { "Content-Type": "text/css" } });
  }

  // Serve script.js
  if (url.pathname === "/script.js") {
    const js = await Deno.readTextFile(join(Deno.cwd(), "script.js"));
    return new Response(js, { status: 200, headers: { "Content-Type": "application/javascript" } });
  }

  // Handle 404
  return new Response("Not Found", { status: 404 });
}, { port: PORT, hostname: HOST });
