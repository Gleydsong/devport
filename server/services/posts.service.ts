import { storage } from "../storage";
import type { InsertPost, Post } from "@shared/schema";

export async function listPosts(): Promise<Post[]> {
  return storage.getPosts();
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return storage.getPost(id);
}

export async function createPost(payload: InsertPost): Promise<Post> {
  return storage.createPost(payload);
}

export async function updatePostById(
  id: string,
  payload: Partial<InsertPost>
): Promise<Post | undefined> {
  return storage.updatePost(id, payload);
}

export async function deletePostById(id: string): Promise<boolean> {
  return storage.deletePost(id);
}
