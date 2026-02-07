import type { Request, Response } from 'express';

export async function controllerGetOwnPosts(req: Request, res: Response) {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    return res.json({ posts: [] });
}
