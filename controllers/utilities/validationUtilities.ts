import { body } from 'express-validator';

import normalizeTitle from '../../db/utilities/normalizeTitle';
import { isUsernameUnique } from '../../db/queries/users/usersQueriesSelect';
import {
    isTitleUnique,
    getPostByPostId,
} from '../../db/queries/posts/postsQueriesSelect';

import validateRole from './validateRole';

const emptyErr = 'must not be empty';
const passwordLengthErr = 'must be at least 8 characters long';
const titleLengthErr = 'Title must be between 10 and 70 characters';
const bodyLengthErr = 'must be between 500 and 10000 characters';
const titleError =
    'Title must only includes letters, numbers, spaces and basic punctuation only';
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
    minLength: number,
    maxLength: number,
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
        .isLength({ min: minLength, max: maxLength })
        .withMessage(
            `${targetEntity} must be between ${minLength} and ${maxLength} characters`,
        );
}

const validateSignup = [
    identifierStringValidation(
        'Username',
        'username',
        /^[a-z0-9]+$/,
        3,
        30,
    ).custom(async (username) => {
        const unique = await isUsernameUnique(username);
        if (!unique) {
            throw new Error('Username already exists');
        }
        return true;
    }),

    identifierStringValidation(
        'Name',
        'name',
        /^[A-Za-z0-9 ]+$/,
        3,
        30,
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

// /^[A-Za-z0-9.,:;?!\-"() ]+$/

const validatePost = [
    identifierStringValidation(
        'Title',
        'title',
        /^[A-Za-z0-9.,:;?!\-"() ]+$/,
        10,
        70,
        titleError,
    ).custom(async (title, { req }) => {
        const normalizedTitle = normalizeTitle(title);
        const unique = await isTitleUnique(normalizedTitle);
        if (unique === true) {
            return true;
        }

        if (unique === false) {
            if (req.method === 'PUT') {
                const postId = req.params?.postId;
                if (Number.isNaN(Number(postId)) === false) {
                    const thisPost = await getPostByPostId(Number(postId));
                    if (thisPost === null) {
                        throw new Error('Could not validate title');
                    }

                    if (title === thisPost.title) {
                        return true;
                    }

                    throw new Error('Title already exists');
                }
                throw new Error('Could not validate title');
            }

            throw new Error('Title already exists');
        }

        throw new Error('Could not validate title');
    }),

    identifierStringValidation(
        'Description',
        'description',
        /^[A-Za-z0-9.,:;?!\-"() ]+$/,
        100,
        300,
        titleError,
    ),

    body('body')
        .notEmpty()
        .withMessage(`Body ${emptyErr}`)
        .bail()
        .isLength({ min: 500, max: 10000 })
        .withMessage(`Body ${bodyLengthErr}`),
];

export { validateSignup, validatePost };
