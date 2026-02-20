import type { Request, Response } from 'express';

import { assumeAuthor } from '../utilities/isUserAuthor';

import {
    getAllUserPosts,
    getPostByPostId,
    getAllPosts,
    getLatestPosts,
} from '../../db/queries/posts/postsQueriesSelect';
import { getPostComments } from '../../db/queries/comments/commentsQueriesSelect';

export async function controllerGetOwnPosts(req: Request, res: Response) {
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

export async function controllerGetPost(req: Request, res: Response) {
    if (req.params === undefined || req.params.postId === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Request missing post ID',
        });
    }

    if (Number.isNaN(Number(req.params.postId)) === true) {
        return res.status(400).json({
            success: false,
            message: 'Invalid post ID!',
        });
    }

    const post = await getPostByPostId(Number(req.params.postId));

    if (post === null) {
        return res.status(404).json({
            success: false,
            message: 'Post not found!',
        });
    }

    return res.json({
        success: true,
        post: {
            title: post.title,
            description: post.description,
            content: post.content,
            createdAt: post.createdAt,
            lastModification: post.lastModification,
        },
        name: post.author.name,
    });
}

export async function controllerGetManyPosts(req: Request, res: Response) {
    const requestedCount = req.query?.count;

    let posts;

    if (Number.isNaN(Number(requestedCount)) === false) {
        posts = await getLatestPosts(Number(requestedCount));
    } else {
        posts = await getAllPosts();
    }

    return res.json({
        success: true,
        posts,
    });
}

export async function controllerGetPostComments(req: Request, res: Response) {
    const postId = req.params?.postId;

    if (Number.isNaN(Number(postId)) === false) {
        const comments = await getPostComments(Number(postId));
        return res.json({
            success: true,
            comments,
        });
    }
    return res.status(400).json({
        success: false,
        message: 'Invalid post ID!',
    });
}
