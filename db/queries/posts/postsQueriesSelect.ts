import { Post } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';

// ------------ SELECT QUERIES ------------

// Implicitly returns posts with the latest being first
export async function getAllPosts() {
    let posts: Post[];
    try {
        posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        name: true,
                    }
                },
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when getting all posts');
        console.error(error);
        console.error('------------------Logged Error------------------');
        posts = [];
    }

    return posts;
}

export async function getLatestPosts(count: number) {
    let posts: Post[];
    try {
        posts = await prisma.post.findMany({
            take: count,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(`Error occurred when getting ${count} posts`);
        console.error(error);
        console.error('------------------Logged Error------------------');
        posts = [];
    }

    return posts;
}

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
        console.error('Error occurred when querying post by user id: ', userId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        posts = null;
    }

    return posts;
}

export async function getPostByPostId(postId: number) {
    let post;
    try {
        post = await prisma.post.findUnique({
            where: {
                postId,
            },
            include: {
                author: true,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when querying post by post id: ', postId);
        console.error(error);
        console.error('------------------Logged Error------------------');
        post = null;
    }

    return post;
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
