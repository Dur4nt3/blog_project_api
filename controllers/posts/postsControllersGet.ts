import type { Request, Response } from 'express';

import isUserAuthor, { assumeAuthor } from '../utilities/isUserAuthor';

import { getAllUserPosts } from '../../db/queries/posts/postsQueriesSelect';

export async function controllerGetOwnPosts(req: Request, res: Response) {
    const authCheck = await isUserAuthor(req);

    if (authCheck !== true) {
        return res.status(authCheck.status).json(authCheck.json);
    }

    assumeAuthor(req);

    const posts = await getAllUserPosts(req.user.userId);

    if (posts === null) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error!',
        });
    }

    return res.json({
        success: true,
        posts,
        author: {
            username: req.user.username,
            name: req.user.name,
        },
    });
}
