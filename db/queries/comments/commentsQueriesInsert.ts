import { prisma } from '../../../lib/prisma';

export async function insertComment(
    content: string,
    postId: number,
    userId: number,
) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId,
                edited: false,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when attempting to insert comment: ', postId, userId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
