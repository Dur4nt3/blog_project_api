const ROLE_POLICIES: any = {
    admin: {
        creatable: false,
        authorAccess: true,
    },
    author: {
        creatable: true,
        keyRequired: true,
        keyEnvVar: 'AUTHOR_KEY',
        authorAccess: true,
    },
    reader: {
        creatable: true,
        keyRequired: false,
        authorAccess: false,
    },
};

export default ROLE_POLICIES;
