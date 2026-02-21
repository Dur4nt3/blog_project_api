import type { Request, Response, NextFunction } from 'express';

export default function csrfCheckMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const csrfCookie = req.cookies.csrfToken;
    const csrfHeader = req.headers['x-csrf-token'];

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return res
            .status(403)
            .json({ success: false, message: 'CSRF token invalid' });
    }

    next();
}
