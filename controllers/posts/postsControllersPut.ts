import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';
import { assumeAuthenticated } from '../utilities/isUserAuthenticated';

import { matchedData, validationResult } from 'express-validator';
import {
    validatePost,
    validateComment,
} from '../utilities/validationUtilities';

import normalizeTitle from '../../db/utilities/normalizeTitle';
import { updatePost } from '../../db/queries/posts/postsQueriesUpdate';
import { updateComment } from '../../db/queries/comments/commentsQueriesUpdate';

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

        const updateSuccess = await updatePost(
            Number(postId),
            title,
            normalizedTitle,
            description,
            body,
        );

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

const controllerPutUpdateComment: any = [
    validateComment,
    async (req: Request, res: Response) => {
        assumeAuthenticated(req);

        const commentId = req.params?.commentId;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { comment } = matchedData(req);

        const updateSuccess = await updateComment(Number(commentId), comment);

        if (updateSuccess !== true) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error!',
            });
        }

        return res.json({
            success: true,
            message: 'Comment updated!',
        });
    },
];

export { controllerPutUpdatePost, controllerPutUpdateComment };
