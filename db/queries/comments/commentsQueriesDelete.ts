import { prisma } from '../../../lib/prisma';

export async function deleteComment(commentId: number, userId: number) {
    try {
        const comment = await prisma.comment.delete({
            where: {
                commentId,
                userId,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when attempting to delete comment: ',
            commentId,
            userId,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
