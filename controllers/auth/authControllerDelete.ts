import type { Request, Response } from 'express';

export async function controllerDeleteToken(req: Request, res: Response) {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated) {
        return res.status(401).json({
            success: false,
            message: 'Logout failed!',
        });
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    }).json({
        success: true,
        message: 'Logout successful!',
    });
}
