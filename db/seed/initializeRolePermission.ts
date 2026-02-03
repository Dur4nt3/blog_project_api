import { prisma } from '../../lib/prisma';

async function main() {
    try {
        const roles = await prisma.role.findMany();
        let reader;
        let author;
        let admin;
        for (const role of roles) {
            if (role.name === 'reader') {
                reader = { ...role };
            }
            if (role.name === 'author') {
                author = { ...role };
            }
            if (role.name === 'admin') {
                admin = { ...role };
            }
        }

        const permissions = await prisma.permission.findMany();
        const permissionsObjFormat = Object.fromEntries(
            permissions.map((permission) => [permission.key, permission.permissionId]),
        );

        if (reader?.roleId === undefined || author?.roleId === undefined || admin?.roleId === undefined) {
            throw new Error('Seeding Error: roleId undefined on at least 1 role!')
        }

        const rolePermissionData = [
            { roleId: reader?.roleId, permissionId: permissionsObjFormat['comment:create'] },
            { roleId: reader?.roleId, permissionId: permissionsObjFormat['comment:edit'] },
            { roleId: reader?.roleId, permissionId: permissionsObjFormat['comment:delete:own'] },

            { roleId: author?.roleId, permissionId: permissionsObjFormat['comment:create'] },
            { roleId: author?.roleId, permissionId: permissionsObjFormat['comment:edit'] },
            { roleId: author?.roleId, permissionId: permissionsObjFormat['comment:delete:own'] },

            { roleId: author?.roleId, permissionId: permissionsObjFormat['post:create'] },
            { roleId: author?.roleId, permissionId: permissionsObjFormat['post:edit'] },
            { roleId: author?.roleId, permissionId: permissionsObjFormat['post:delete:own'] },

            { roleId: admin?.roleId, permissionId: permissionsObjFormat['comment:create'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['comment:edit'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['comment:delete:own'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['comment:delete:any'] },

            { roleId: admin?.roleId, permissionId: permissionsObjFormat['post:create'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['post:edit'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['post:delete:own'] },
            { roleId: admin?.roleId, permissionId: permissionsObjFormat['post:delete:any'] },
        ];

        await prisma.rolePermission.createMany({
            data: rolePermissionData,
            skipDuplicates: true,
        });

        console.log('RolePermissions seeded successfully!');
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
