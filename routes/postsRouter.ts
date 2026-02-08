import { Router } from 'express';

import jwtAuthMiddleware from '../auth/jwtAuthMiddleware';

import { controllerGetOwnPosts } from '../controllers/posts/postsControllersGet';
import { controllerPostCreatePost } from '../controllers/posts/postsControllerPost';

const postsRouter = Router();

postsRouter.get('/me', jwtAuthMiddleware, controllerGetOwnPosts);

postsRouter.post('/', jwtAuthMiddleware, controllerPostCreatePost);

export default postsRouter;
