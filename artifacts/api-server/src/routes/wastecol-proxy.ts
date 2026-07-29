/**
 * Proxy: /api/wasteCol/* → https://jihami.co.ke/api/wasteCol/*
 *
 * Replit's path router sends all /api/* traffic to this server before the
 * Vite dev-server proxy can act on it. This handler transparently forwards
 * every wasteCol request (any method, any path, any query string) to the
 * real jihami.co.ke backend and streams the response back unchanged.
 */

import { Router, type Request, type Response } from "express";

const router = Router();

const UPSTREAM = "https://jihami.co.ke";

router.all("/wasteCol/*splat", async (req: Request, res: Response) => {
  const upstreamUrl = `${UPSTREAM}${req.originalUrl}`;

  // Forward all headers except host (which must reflect the upstream)
  const forwardHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (key.toLowerCase() === "host") continue;
    if (typeof value === "string") forwardHeaders[key] = value;
    else if (Array.isArray(value))  forwardHeaders[key] = value.join(", ");
  }

  const hasBody = ["POST", "PUT", "PATCH"].includes(req.method.toUpperCase());

  let fetchResponse: Response;
  try {
    fetchResponse = await fetch(upstreamUrl, {
      method:  req.method,
      headers: forwardHeaders,
      body:    hasBody ? JSON.stringify(req.body) : undefined,
    } as RequestInit) as unknown as Response;
  } catch (err) {
    console.error("wasteCol proxy error:", err);
    res.status(502).json({ code: 502, message: "Upstream unreachable" });
    return;
  }

  // Mirror status and content-type back to the browser
  res.status((fetchResponse as unknown as globalThis.Response).status);

  const ct = (fetchResponse as unknown as globalThis.Response).headers.get("content-type");
  if (ct) res.setHeader("Content-Type", ct);

  const text = await (fetchResponse as unknown as globalThis.Response).text();
  res.send(text);
});

export default router;
