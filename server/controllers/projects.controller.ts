import type { Request, Response } from "express";
import { z } from "zod";
import { insertProjectSchema } from "@shared/schema";
import {
  listProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
} from "../services/projects.service";
import { AppError } from "../errors";

const projectIdSchema = z.string().uuid();
const createProjectSchema = insertProjectSchema.extend({
  tags: z.array(z.string()).optional().default([]),
});
const updateProjectSchema = createProjectSchema.partial();

export async function listProjectsController(_req: Request, res: Response) {
  const projects = await listProjects();
  res.status(200).json({ data: projects });
}

export async function getProjectController(req: Request, res: Response) {
  const id = projectIdSchema.parse(req.params.id);
  const project = await getProjectById(id);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({ data: project });
}

export async function createProjectController(req: Request, res: Response) {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Invalid project payload", 400, parsed.error.flatten());
  }

  const project = await createProject(parsed.data);
  res.status(201).json({ data: project });
}

export async function updateProjectController(req: Request, res: Response) {
  const id = projectIdSchema.parse(req.params.id);
  const parsed = updateProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Invalid project payload", 400, parsed.error.flatten());
  }

  if (Object.keys(parsed.data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  const project = await updateProjectById(id, parsed.data);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({ data: project });
}

export async function deleteProjectController(req: Request, res: Response) {
  const id = projectIdSchema.parse(req.params.id);
  const removed = await deleteProjectById(id);
  if (!removed) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({ success: true });
}
