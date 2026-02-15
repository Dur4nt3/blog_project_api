import { prisma } from '../../../lib/prisma';

export async function insertUser(
    username: string,
    name: string,
    hashedPassword: string,
    roleId: number,
) {
    try {
        await prisma.user.create({
            data: {
                username: username,
                name: name,
                password: hashedPassword,
                roleId,
            },
        });
    } catch (error) {
        console.error('------------------Logged Error------------------');
        console.error('Error occurred when trying to create user');
        console.error(error);
        console.error('------------------Logged Error------------------');
        return false;
    }

    return true;
}
