import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';

import { matchedData, validationResult } from 'express-validator';
import { validatePost } from '../utilities/validationUtilities';

import normalizeTitle from '../../db/utilities/normalizeTitle';
import { insertPost } from '../../db/queries/posts/postsQueriesInsert';

const controllerPostCreatePost: any = [
    validatePost,
    async (req: Request, res: Response) => {
        assumeAuthor(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { title, description, body } = matchedData(req);

        const normalizedTitle = normalizeTitle(title);

        const creationSuccess = await insertPost(
            title,
            normalizedTitle,
            description,
            body,
            req.user.userId,
        );

        if (creationSuccess !== true) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error!',
            });
        }

        return res.json({
            success: true,
            message: 'Post created!',
        });
    },
];

export { controllerPostCreatePost };
