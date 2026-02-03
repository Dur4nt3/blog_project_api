import { prisma } from '../../../lib/prisma';

// ------------ SELECT QUERIES ------------

export async function getUserById(userId: number) {
    let user;
    try {
        user = await prisma.user.findUnique({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when querying user by id: ', userId);
        console.error('------------------Logged Error------------------');
        user = null;
    }

    return user;
}

export async function getUserByUsername(username: string) {
    let user;
    try {
        user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(
            'Error occurred when querying user by username: ',
            username,
        );
        console.error('------------------Logged Error------------------');
        user = null;
    }

    return user;
}

export async function getRoleByName(name: string) {
    let role;
    try {
        role = await prisma.role.findUnique({
            where: {
                name,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error(error);
        console.error('------------------Logged Error------------------');
        return null;
    }

    return role;
}

// ------------ SELECT QUERIES ------------

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------

export async function isUsernameUnique(username: string) {
    const user = await getUserByUsername(username);

    return user === null;
}

// ------------ SELECT QUERIES (VALIDATION ONLY) ------------
