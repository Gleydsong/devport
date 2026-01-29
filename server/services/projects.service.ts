import { storage } from "../storage";
import type { InsertProject, Project } from "@shared/schema";

export async function listProjects(): Promise<Project[]> {
  return storage.getProjects();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return storage.getProject(id);
}

export async function createProject(
  payload: InsertProject
): Promise<Project> {
  return storage.createProject(payload);
}

export async function updateProjectById(
  id: string,
  payload: Partial<InsertProject>
): Promise<Project | undefined> {
  return storage.updateProject(id, payload);
}

export async function deleteProjectById(id: string): Promise<boolean> {
  return storage.deleteProject(id);
}
