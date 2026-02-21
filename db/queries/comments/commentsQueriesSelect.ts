import { prisma } from '../../../lib/prisma';
import type { Comment } from '../../../generated/prisma/client';

// ------------ SELECT QUERIES ------------

export async function getPostComments(postId: number) {
    let comments: Comment[];
    try {
        comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when getting all post comments: ',
            postId,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');
        comments = [];
    }

    return comments;
}

// ------------ SELECT QUERIES ------------

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------

export async function isUserCommentOwner(commentId: number, userId: number) {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                commentId,
            },
            select: {
                commentId: true,
                userId: true,
            },
        });

        if (comment === null) {
            return false;
        }

        return comment.userId === userId;
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when checking comment ownership: ',
            commentId,
            userId,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');

        return false;
    }
}

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------
