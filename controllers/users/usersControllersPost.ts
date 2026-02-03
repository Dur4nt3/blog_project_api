import type { Request, Response } from 'express';

import { matchedData, validationResult } from 'express-validator';

import { validateSignup } from '../utilities/validationUtilities';
import { generatePassword } from '../../auth/passwordUtils';

import { getRoleByName } from '../../db/queries/users/usersQueriesSelect';
import { insertUser } from '../../db/queries/users/usersQueriesInsert';

const controllerPostSignup: any = [
    validateSignup,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { username, name, password } = matchedData(req);
        const hashedPassword = await generatePassword(password);

        const role = await getRoleByName(req.body.role);
        if (role === null) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error!',
            });
        }

        const creationSuccess = await insertUser(
            username,
            name,
            hashedPassword,
            role.roleId,
        );

        if (!creationSuccess) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error!',
            });
        }

        return res.json({
            success: true,
            message: 'User created!',
        });
    },
];

export { controllerPostSignup };
