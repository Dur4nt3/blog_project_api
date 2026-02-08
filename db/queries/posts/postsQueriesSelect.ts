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
                author: true
            }
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when querying user by id: ', userId);
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
                normalizedTitle
            }
        });

        return post === null;
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when checking title uniqueness: ', normalizedTitle);
        console.error('------------------Logged Error------------------');

        return null;
    }
}


// ------------ SELECT QUERIES (VALIDATION ONLY) ------------


