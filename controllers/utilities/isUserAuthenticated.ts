import type { Request, Response } from 'express';

import doesUserHaveAuthorAccess from './doesUserHaveAuthorAccess';

type authenticatedReq = Request & {
    user: Express.User;
};

type authenticatedRequestFailure = {
    status: number,
    json: {
        success: boolean,
        message: string,
    }
}

export default async function isUserAuthenticated(req: Request): Promise<true | authenticatedRequestFailure> {
    const isAuthenticated = !!req.user;

    if (!isAuthenticated || req.user === undefined) {
        return {
            status: 401,
            json: { success: false, message: 'Authentication required' },
        };
    }

    return true;
}

export function assumeAuthenticated(req: Request): asserts req is authenticatedReq {}
