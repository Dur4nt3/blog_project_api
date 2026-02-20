import { Router } from 'express';

import jwtAuthMiddleware from '../auth/jwtAuthMiddleware';
import authenticatedCheckMiddleware from '../controllers/utilities/authenticatedCheckMiddleware';
import authorCheckMiddleware from '../controllers/utilities/authorCheckMiddleware';
import postOwnerMiddleware from '../controllers/utilities/postOwnerMiddleware';

import { controllerGetOwnPosts, controllerGetPost, controllerGetManyPosts, controllerGetPostComments } from '../controllers/posts/postsControllersGet';
import { controllerPostCreatePost, controllerPostCreateComment } from '../controllers/posts/postsControllersPost';
import { controllerPutUpdatePost } from '../controllers/posts/postsControllersPut';
import { controllerDeletePost } from '../controllers/posts/postsControllersDelete';

const postsRouter = Router();

postsRouter.get('/', controllerGetManyPosts);

postsRouter.post('/', jwtAuthMiddleware, authorCheckMiddleware, controllerPostCreatePost);

postsRouter.get('/me', jwtAuthMiddleware, authorCheckMiddleware, controllerGetOwnPosts);

postsRouter.get('/:postId', controllerGetPost);

postsRouter.put('/:postId', jwtAuthMiddleware, authorCheckMiddleware, postOwnerMiddleware, controllerPutUpdatePost);

postsRouter.delete('/:postId', jwtAuthMiddleware, authorCheckMiddleware, postOwnerMiddleware, controllerDeletePost);

postsRouter.get('/:postId/comments', controllerGetPostComments);

postsRouter.post('/:postId/comments', jwtAuthMiddleware, authenticatedCheckMiddleware, controllerPostCreateComment);

export default postsRouter;
