import type { Request, Response, NextFunction } from 'express';

import { isUserCommentOwner } from '../../db/queries/comments/commentsQueriesSelect';
import { assumeAuthenticated } from './isUserAuthenticated';

export default async function commentOwnerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {

    assumeAuthenticated(req);

    const { commentId } = req.params;

    if (typeof commentId !== 'string' || Number.isNaN(Number(commentId))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid comment ID',
        });
    }

    const userIsOwner = await isUserCommentOwner(Number(commentId), req.user.userId);

    if (userIsOwner !== true) {
        return res.status(403).json({
            success: false,
            message: 'You are not the owner of this post',
        });
    }

    next();
}
