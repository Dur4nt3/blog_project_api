import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';

import { matchedData, validationResult } from 'express-validator';
import { validatePost } from '../utilities/validationUtilities';

import normalizeTitle from '../../db/utilities/normalizeTitle';
import { UpdatePost } from '../../db/queries/posts/postsQueriesUpdate';

const controllerPutUpdatePost: any = [
    validatePost,
    async (req: Request, res: Response) => {
        assumeAuthor(req);

        const { postId } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { title, description, body } = matchedData(req);

        const normalizedTitle = normalizeTitle(title);

        const updateSuccess = await UpdatePost(Number(postId), title, normalizedTitle, description, body);

        if (updateSuccess !== true) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error!',
            });
        }

        return res.json({
            success: true,
            message: 'Post updated!',
        });
    },
];

export { controllerPutUpdatePost };
