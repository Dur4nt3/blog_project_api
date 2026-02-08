import { prisma } from "../../../lib/prisma";

export async function insertPost(title: string, normalizedTitle: string, description: string, content: string, userId: number) {
    try {
        console.log('creating post');
        const post = await prisma.post.create({
            data: {
                title,
                normalizedTitle,
                description,
                content,
                userId,
            }
        })
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}