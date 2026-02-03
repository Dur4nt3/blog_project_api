import path from 'path';
import fs from 'fs';

import type { Request } from 'express';

import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

import { getUserById } from '../db/queries/users/usersQueriesSelect';

const __dirname = import.meta.dirname;

const pathToKey = path.join(__dirname, 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

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
