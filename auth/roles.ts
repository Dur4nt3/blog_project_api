const ROLE_POLICIES: any = {
    admin: {
        creatable: false,
    },
    author: {
        creatable: true,
        keyRequired: true,
        keyEnvVar: 'AUTHOR_KEY',
    },
    reader: {
        creatable: true,
        keyRequired: false,
    },
};

export default ROLE_POLICIES;
