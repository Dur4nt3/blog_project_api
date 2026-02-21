import { prisma } from '../../../lib/prisma';

export async function updateComment(commentId: number, content: string) {
    try {
        const comment = await prisma.comment.update({
            where: {
                commentId,
            },
            data: {
                content,
                edited: true,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when attempting to update comment: ',
            commentId,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
