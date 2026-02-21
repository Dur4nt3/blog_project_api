import type { Request } from 'express';

import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

import { getUserById } from '../db/queries/users/usersQueriesSelect';

if (process.env.PUBLIC_KEY === undefined) {
    throw new Error('Public key not defined')
}

const PUB_KEY = process.env.PUBLIC_KEY;

async function verifyCallback(payload: any, done: any) {
    try {
        const user = await getUserById(payload.sub);

        if (user === null) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

function cookieExtractor(req: Request) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    return token;
}

const options: StrategyOptionsWithoutRequest = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);
