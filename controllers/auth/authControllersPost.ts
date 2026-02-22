import crypto from 'node:crypto';
import type { Request, Response } from 'express';

import { getUserByUsername } from '../../db/queries/users/usersQueriesSelect';
import { validatePassword } from '../../auth/passwordUtils';
import issueJWT from '../../auth/issueJWT';

export async function controllerPostToken(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (user === null) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials!',
        });
    }

    const passwordValid = await validatePassword(password, user.password);

    if (!passwordValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials!',
        });
    }

    const jwt = issueJWT(user);
    const csrfToken = crypto.randomBytes(24).toString('hex');

    return res
        .cookie('jwt', jwt.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        })
        .cookie('csrfToken', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
            success: true,
            message: 'Login successful!',
            csrfToken,
        });
}
