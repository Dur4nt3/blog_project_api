import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';

import { deletePost } from '../../db/queries/posts/postsQueriesDelete';

export async function controllerDeletePost(req: Request, res: Response) {
    assumeAuthor(req);

    const { postId } = req.params;

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
