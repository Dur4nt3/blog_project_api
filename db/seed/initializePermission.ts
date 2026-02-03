import { prisma } from '../../lib/prisma';

async function main() {
    try {
        await prisma.permission.createMany({
            data: [
                { key: 'post:create', description: 'Create posts' },
                { key: 'post:edit', description: 'Edit your posts' },
                { key: 'post:delete:own', description: 'Delete your posts' },
                { key: 'post:delete:any', description: 'Delete any post' },
                { key: 'comment:create', description: 'Create comments' },
                { key: 'comment:edit', description: 'Edit your comments' },
                { key: 'comment:delete:own', description: 'Delete your comments' },
                { key: 'comment:delete:any', description: 'Delete any comment' },                
            ],
            skipDuplicates: true,
        });

        console.log('Permissions seeded successfully!');
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
