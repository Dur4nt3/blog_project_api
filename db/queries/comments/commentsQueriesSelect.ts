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
                author: true,
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
