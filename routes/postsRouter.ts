import { Router } from 'express';

import jwtAuthMiddleware from '../auth/jwtAuthMiddleware';
import authorCheckMiddleware from '../controllers/utilities/authorCheckMiddleware';

import { controllerGetOwnPosts, controllerGetPost } from '../controllers/posts/postsControllersGet';
import { controllerPostCreatePost } from '../controllers/posts/postsControllersPost';
import { controllerDeletePost } from '../controllers/posts/postsControllersDelete';

const postsRouter = Router();

postsRouter.get('/me', jwtAuthMiddleware, authorCheckMiddleware, controllerGetOwnPosts);

postsRouter.get('/:postId', controllerGetPost);

postsRouter.post('/', jwtAuthMiddleware, authorCheckMiddleware, controllerPostCreatePost);

postsRouter.delete('/:postId', jwtAuthMiddleware, authorCheckMiddleware, controllerDeletePost);

export default postsRouter;
