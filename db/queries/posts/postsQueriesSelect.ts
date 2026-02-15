import { prisma } from '../../../lib/prisma';

// ------------ SELECT QUERIES ------------

export async function getAllUserPosts(userId: number) {
    let posts;
    try {
        posts = await prisma.post.findMany({
            where: {
                userId,
            },
            include: {
                author: true,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when querying user by id: ', userId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        posts = null;
    }

    return posts;
}

// ------------ SELECT QUERIES ------------

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------

export async function isTitleUnique(normalizedTitle: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                normalizedTitle,
            },
        });

        return post === null;
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when checking title uniqueness: ',
            normalizedTitle,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');

        return null;
    }
}

export async function isUserPostOwner(postId: number, userId: number) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                postId,
            },
            select: {
                postId: true,
                userId: true,
            },
        });

        if (post === null) {
            return false;
        }

        return post.userId === userId;
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when checking post ownership: ',
            postId,
            userId,
        );
        console.error(error);
        console.error('------------------Logged Error------------------');

        return false;
    }
}

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------
