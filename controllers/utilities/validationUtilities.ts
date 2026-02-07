import { body } from 'express-validator';

import { isUsernameUnique } from '../../db/queries/users/usersQueriesSelect';

import validateRole from './validateRole';

const emptyErr = 'must not be empty';
const lengthErr = 'must be between 3 and 30 characters';
const passwordLengthErr = 'must be at least 8 characters long';
const descLengthErr = 'must be between 3 and 50 characters';
const alphaNumericErr =
    'must only contain letters and numbers (lowercase only)';
const specialAlphaNumericErr = 'must only contain letters and numbers';

// Validator for identifier strings like username, blog title, etc.
// Because each identifier has its own constraint
// this function is very flexible in its validation
function identifierStringValidation(
    targetEntity: string,
    targetField: string,
    regex: RegExp,
    errorVar?: string,
) {
    return body(targetField)
        .trim()
        .notEmpty()
        .withMessage(`${targetEntity} ${emptyErr}`)
        .bail()
        .matches(regex)
        .withMessage(
            `${targetEntity} ${errorVar !== undefined ? errorVar : alphaNumericErr}`,
        )
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage(`${targetEntity} ${lengthErr}`);
}

const validateSignup = [
    identifierStringValidation('Username', 'username', /^[a-z0-9]+$/).custom(
        async (username) => {
            const unique = await isUsernameUnique(username);
            if (!unique) {
                throw new Error('Username already exists');
            }
            return true;
        },
    ),

    identifierStringValidation(
        'Name',
        'name',
        /^[A-Za-z0-9 ]+$/,
        specialAlphaNumericErr,
    ),

    body('password')
        .notEmpty()
        .withMessage(`Password ${emptyErr}`)
        .bail()
        .isLength({ min: 8 })
        .withMessage(`Password ${passwordLengthErr}`),

    body('cpassword')
        .notEmpty()
        .withMessage(`Please verify your password`)
        .bail()
        .custom((cpassword, { req }) => {
            if (cpassword !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    body('role').custom(async (role, { req }) => {
        if (req.body === undefined) {
            throw new Error('Could not validate role');
        }

        const valid = await validateRole(role, req.body.key);
        if (valid === null) {
            throw new Error('Could not validate role');
        }
        if (valid === false) {
            throw new Error('Invalid key');
        }

        return true;
    }),
];

export { validateSignup };
