import type { Express } from "express";
import { Router } from "express";
import { type Server } from "http";
import {
  listProjectsController,
  getProjectController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} from "./controllers/projects.controller";
import {
  listPostsController,
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
} from "./controllers/posts.controller";
import {
  registerController,
  loginController,
  logoutController,
  meController,
} from "./controllers/auth.controller";
import { asyncHandler } from "./utils/async-handler";
import { requireAuth } from "./middleware/require-auth";
import rateLimit from "express-rate-limit";
import { authLogger } from "./middleware/auth-logger";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const api = Router();

  const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
  });

  api.post(
    "/auth/register",
    authLimiter,
    authLogger,
    asyncHandler(registerController)
  );
  api.post(
    "/auth/login",
    authLimiter,
    authLogger,
    asyncHandler(loginController)
  );
  api.post("/auth/logout", authLogger, asyncHandler(logoutController));
  api.get("/auth/me", asyncHandler(meController));

  api.get("/projects", asyncHandler(listProjectsController));
  api.get("/projects/:id", asyncHandler(getProjectController));
  api.post("/projects", requireAuth, asyncHandler(createProjectController));
  api.patch("/projects/:id", requireAuth, asyncHandler(updateProjectController));
  api.delete("/projects/:id", requireAuth, asyncHandler(deleteProjectController));

  api.get("/posts", asyncHandler(listPostsController));
  api.get("/posts/:id", asyncHandler(getPostController));
  api.post("/posts", requireAuth, asyncHandler(createPostController));
  api.patch("/posts/:id", requireAuth, asyncHandler(updatePostController));
  api.delete("/posts/:id", requireAuth, asyncHandler(deletePostController));

  app.use("/api", api);

  return httpServer;
}
