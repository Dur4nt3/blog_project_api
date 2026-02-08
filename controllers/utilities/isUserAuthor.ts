import type { Request, Response } from 'express';

import doesUserHaveAuthorAccess from './doesUserHaveAuthorAccess';

type authenticatedReq = Request & {
    user: Express.User;
};

type authorRequestFailure = {
    status: number,
    json: {
        success: boolean,
        message: string,
    }
}

export default async function isUserAuthor(req: Request): Promise<true | authorRequestFailure> {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated || req.user === undefined) {
        return {
            status: 401,
            json: { success: false, message: 'Authentication required' },
        };
    }

    const hasAuthorAccess = await doesUserHaveAuthorAccess(req.user.userId);

    if (hasAuthorAccess !== true) {
        return {
            status: 403,
            json: {
                success: false,
                message: 'User is not an author!',
            },
        };
    }

    return true;
}

export function assumeAuthor(req: Request): asserts req is authenticatedReq {}
