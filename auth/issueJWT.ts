import path from 'path';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';

const __dirname = import.meta.dirname;

const pathToKey = path.join(__dirname, 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

export default function issueJWT(user: any) {
    const userId = user.userId;

    const expiresIn = '1d';

    const payload = {
        sub: userId,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    });

    return {
        token: signedToken,
        expires: expiresIn,
    };
}
