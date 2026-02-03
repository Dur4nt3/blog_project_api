import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerGetPosts } from "../controllers/posts/postsControllersGet";

const postsRouter = Router();

postsRouter.get('/', jwtAuthMiddleware, controllerGetPosts);

export default postsRouter;