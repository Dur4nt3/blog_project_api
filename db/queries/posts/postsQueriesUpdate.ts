import { prisma } from '../../../lib/prisma';

export async function UpdatePost(
    postId: number,
    title: string,
    normalizedTitle: string,
    description: string,
    content: string,
) {
    try {
        const post = await prisma.post.update({
            where: {
                postId,
            },
            data: {
                title,
                normalizedTitle,
                description,
                content,
                lastModification: new Date(),
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when attempting to update post: ', postId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
