import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';

import { isUserPostOwner } from '../../db/queries/posts/postsQueriesSelect';
import { deletePost } from '../../db/queries/posts/postsQueriesDelete';

export async function controllerDeletePost(req: Request, res: Response) {
    assumeAuthor(req);

    const { postId } = req.params;

    if (typeof postId !== 'string' || Number.isNaN(Number(postId))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Post ID',
        });
    }

    const userIsOwner = await isUserPostOwner(Number(postId), req.user.userId);

    if (userIsOwner !== true) {
        return res.status(403).json({
            success: false,
            message: 'You are not the owner of this post',
        });
    }

    const deletionSuccess = await deletePost(Number(postId), req.user.userId);

    if (deletionSuccess !== true) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error!',
        });
    }

    return res.json({
        success: true,
        message: 'Post successfully deleted',
    });
}
