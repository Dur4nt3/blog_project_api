import jsonwebtoken from 'jsonwebtoken';

if (process.env.PRIVATE_KEY === undefined) {
    throw new Error('Private key not defined');
}

const PRIV_KEY = process.env.PRIVATE_KEY;

export default function issueJWT(user: any) {
    const userId = user.userId;

    const expiresIn = '1d';

    const payload = {
        sub: userId,
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
