import ROLE_POLICIES from '../../auth/roles';

import { getRoleByUserId } from '../../db/queries/users/usersQueriesSelect';

export default async function doesUserHaveAuthorAccess(userId: number) {
    const roleName = await getRoleByUserId(userId);

    if (roleName === null) {
        return false;
    }

    if (ROLE_POLICIES[roleName] !== undefined) {
        return ROLE_POLICIES[roleName].authorAccess;
    }
}
