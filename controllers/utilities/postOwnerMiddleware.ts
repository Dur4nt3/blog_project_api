import type { Request, Response, NextFunction } from 'express';

import { isUserPostOwner } from '../../db/queries/posts/postsQueriesSelect';
import { assumeAuthor } from './isUserAuthor';

export default async function postOwnerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {

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

    next();
}
