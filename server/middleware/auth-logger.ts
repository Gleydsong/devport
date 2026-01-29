import type { NextFunction, Request, Response } from "express";

function getClientIp(req: Request) {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

export function authLogger(req: Request, res: Response, next: NextFunction) {
  const username =
    typeof req.body?.username === "string" ? req.body.username : "unknown";
  const ip = getClientIp(req);
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const outcome = status >= 400 ? "failed" : "success";
    console.info(
      `[auth] ${req.method} ${req.originalUrl} ${status} (${outcome}) in ${duration}ms - user=${username} ip=${ip}`
    );
  });

  next();
}
