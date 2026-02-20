import type { Request, Response, NextFunction } from 'express';

import isUserAuthenticated from './isUserAuthenticated';

export default async function authenticatedCheckMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authCheck = await isUserAuthenticated(req);

    if (authCheck !== true) {
        return res.status(authCheck.status).json(authCheck.json);
    }

    next();
}
