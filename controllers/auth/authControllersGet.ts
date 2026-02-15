import type { Request, Response } from 'express';

export function controllerGetToken(req: Request, res: Response) {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated || req.user === undefined) {
        return res
            .status(401)
            .json({ success: false, message: 'Authentication required' });
    }

    return res.json({
        success: true,
        message: 'Successful authentication!',
    });
}
