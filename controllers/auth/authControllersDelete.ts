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
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }).clearCookie('csrfToken', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }).json({
        success: true,
        message: 'Logout successful!',
    });
}
