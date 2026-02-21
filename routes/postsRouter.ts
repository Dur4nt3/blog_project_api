import { Router } from 'express';

import csrfCheckMiddleware from '../controllers/utilities/csrfCheckMiddleware';
import jwtAuthMiddleware from '../auth/jwtAuthMiddleware';
import authenticatedCheckMiddleware from '../controllers/utilities/authenticatedCheckMiddleware';
import authorCheckMiddleware from '../controllers/utilities/authorCheckMiddleware';
import postOwnerMiddleware from '../controllers/utilities/postOwnerMiddleware';
import commentOwnerMiddleware from '../controllers/utilities/commentOwnerMiddleware';

import {
    controllerGetOwnPosts,
    controllerGetPost,
    controllerGetManyPosts,
    controllerGetPostComments,
} from '../controllers/posts/postsControllersGet';
import {
    controllerPostCreatePost,
    controllerPostCreateComment,
} from '../controllers/posts/postsControllersPost';
import {
    controllerPutUpdatePost,
    controllerPutUpdateComment,
} from '../controllers/posts/postsControllersPut';
import {
    controllerDeletePost,
    controllerDeleteComment,
} from '../controllers/posts/postsControllersDelete';

const postsRouter = Router();

// ------------- ALL POSTS -------------

postsRouter.get('/', controllerGetManyPosts);

postsRouter.post(
    '/',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authorCheckMiddleware,
    controllerPostCreatePost,
);

// ------------- ALL POSTS -------------

// ------------- USER'S POSTS -------------

postsRouter.get(
    '/me',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authorCheckMiddleware,
    controllerGetOwnPosts,
);

// ------------- USER'S POSTS -------------

// ------------- SPECIFIC POST -------------

postsRouter.get('/:postId', controllerGetPost);

postsRouter.put(
    '/:postId',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authorCheckMiddleware,
    postOwnerMiddleware,
    controllerPutUpdatePost,
);

postsRouter.delete(
    '/:postId',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authorCheckMiddleware,
    postOwnerMiddleware,
    controllerDeletePost,
);

// ------------- SPECIFIC POST -------------

// ------------- ALL COMMENTS -------------

postsRouter.get('/:postId/comments', controllerGetPostComments);

postsRouter.post(
    '/:postId/comments',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authenticatedCheckMiddleware,
    controllerPostCreateComment,
);

// ------------- ALL COMMENTS -------------

// ------------- SPECIFIC COMMENT -------------

postsRouter.put(
    '/:postId/comments/:commentId',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authenticatedCheckMiddleware,
    commentOwnerMiddleware,
    controllerPutUpdateComment,
);

postsRouter.delete(
    '/:postId/comments/:commentId',
    csrfCheckMiddleware,
    jwtAuthMiddleware,
    authenticatedCheckMiddleware,
    commentOwnerMiddleware,
    controllerDeleteComment,
);

// ------------- SPECIFIC COMMENT -------------

export default postsRouter;
