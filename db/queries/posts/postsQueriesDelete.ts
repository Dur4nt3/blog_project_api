import { prisma } from '../../../lib/prisma';

export async function deletePost(postId: number, userId: number) {
    try {
        const post = await prisma.post.delete({
            where: {
                postId,
                userId,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when deleting post: ', postId, userId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
