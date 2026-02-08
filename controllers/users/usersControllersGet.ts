import type { Request, Response } from 'express';

import ROLE_POLICIES from '../../auth/roles';

// Update this with ROLE_POLICIES
// This ensures this endpoint gets the reflects the latest permissions
export function controllerGetUserPermissions(req: Request, res: Response) {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated || req.user === undefined) {
        return res
            .status(401)
            .json({ success: false, message: 'Authentication required' });
    }

    const policy = ROLE_POLICIES[req.user.role.name];

    if (policy === undefined) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error!' });
    }

    return res.json({
        success: true,
        user: {
            username: req.user.username,
            name: req.user.name,
        },
        permissions: {
            authorAccess: policy.authorAccess,
        },
    });
}
