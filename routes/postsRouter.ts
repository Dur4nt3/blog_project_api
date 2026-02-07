import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerGetOwnPosts } from "../controllers/posts/postsControllersGet";

const postsRouter = Router();

postsRouter.get('/me', jwtAuthMiddleware, controllerGetOwnPosts);

export default postsRouter;