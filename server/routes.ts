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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const api = Router();

  api.post("/auth/register", asyncHandler(registerController));
  api.post("/auth/login", asyncHandler(loginController));
  api.post("/auth/logout", asyncHandler(logoutController));
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
