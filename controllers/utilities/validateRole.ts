import ROLE_POLICIES from "../../auth/roles";
import { getRoleByName } from "../../db/queries/users/usersQueriesSelect";

// null here indicates that either
// a role couldn't be found
// a user with the request role cannot be created
// false indicates that
// the given key isn't valid
export default async function validateRole(roleName: string, key: string) {
    const role = await getRoleByName(roleName);
    if (role === null) {
        return null;
    }

    if (!ROLE_POLICIES[role.name].creatable) {
        return null;
    }

    if (ROLE_POLICIES[role.name].keyRequired) {
        const {keyEnvVar} = ROLE_POLICIES[role.name];

        if (process.env[keyEnvVar] !== key) {
            return false;
        }
    }

    return true;
}