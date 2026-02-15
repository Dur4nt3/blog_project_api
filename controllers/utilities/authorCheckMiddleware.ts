import type { Request, Response, NextFunction } from 'express';

import isUserAuthor from './isUserAuthor';

export default async function authorCheckMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authCheck = await isUserAuthor(req);

    if (authCheck !== true) {
        return res.status(authCheck.status).json(authCheck.json);
    }

    next();
}
