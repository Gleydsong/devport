import type { Request, Response } from "express";
import { z } from "zod";
import { insertPostSchema } from "@shared/schema";
import {
  listPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
} from "../services/posts.service";
import { AppError } from "../errors";

const postIdSchema = z.string().uuid();
const createPostSchema = insertPostSchema.extend({
  publishedAt: z.coerce.date().optional().nullable(),
});
const updatePostSchema = createPostSchema.partial();

export async function listPostsController(_req: Request, res: Response) {
  const posts = await listPosts();
  res.status(200).json({ data: posts });
}

export async function getPostController(req: Request, res: Response) {
  const id = postIdSchema.parse(req.params.id);
  const post = await getPostById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  res.status(200).json({ data: post });
}

export async function createPostController(req: Request, res: Response) {
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Invalid post payload", 400, parsed.error.flatten());
  }

  const post = await createPost(parsed.data);
  res.status(201).json({ data: post });
}

export async function updatePostController(req: Request, res: Response) {
  const id = postIdSchema.parse(req.params.id);
  const parsed = updatePostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Invalid post payload", 400, parsed.error.flatten());
  }

  if (Object.keys(parsed.data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  const post = await updatePostById(id, parsed.data);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  res.status(200).json({ data: post });
}

export async function deletePostController(req: Request, res: Response) {
  const id = postIdSchema.parse(req.params.id);
  const removed = await deletePostById(id);
  if (!removed) {
    throw new AppError("Post not found", 404);
  }

  res.status(200).json({ success: true });
}
