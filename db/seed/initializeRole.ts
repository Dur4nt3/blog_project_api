import { prisma } from "../../lib/prisma";

async function main() {
    try {
        await prisma.role.createMany({
            data: [
                { name: 'reader', description: 'Can read posts and comment' },
                {
                    name: 'author',
                    description: 'Can create and edit own posts',
                },
                { name: 'admin', description: 'Full site administration' },
            ],
            skipDuplicates: true,
        });

        console.log('Roles seeded successfully!');
    } catch (error) {
        console.error(
            '------------------Initialization Error------------------',
        );
        console.error(error);
        console.error(
            '------------------Initialization Error------------------',
        );
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
