import { Router } from 'express';

import jwtAuthMiddleware from '../auth/jwtAuthMiddleware';
import authorCheckMiddleware from '../controllers/utilities/authorCheckMiddleware';
import postOwnerMiddleware from '../controllers/utilities/postOwnerMiddleware';

import { controllerGetOwnPosts, controllerGetPost, controllerGetManyPosts } from '../controllers/posts/postsControllersGet';
import { controllerPostCreatePost } from '../controllers/posts/postsControllersPost';
import { controllerPutUpdatePost } from '../controllers/posts/postsControllersPut';
import { controllerDeletePost } from '../controllers/posts/postsControllersDelete';

const postsRouter = Router();

postsRouter.get('/', controllerGetManyPosts);

postsRouter.post('/', jwtAuthMiddleware, authorCheckMiddleware, controllerPostCreatePost);

postsRouter.get('/me', jwtAuthMiddleware, authorCheckMiddleware, controllerGetOwnPosts);

postsRouter.get('/:postId', controllerGetPost);

postsRouter.put('/:postId', jwtAuthMiddleware, authorCheckMiddleware, postOwnerMiddleware, controllerPutUpdatePost);

postsRouter.delete('/:postId', jwtAuthMiddleware, authorCheckMiddleware, postOwnerMiddleware, controllerDeletePost);

export default postsRouter;
