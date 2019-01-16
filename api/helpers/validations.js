/* eslint-disable newline-per-chained-call */
/* eslint-disable indent */
import { check } from 'express-validator/check';
import validators from './validators';

export default {

    // users
    userSigningUp: [
        check('firstName')
        .not().isEmpty().withMessage('firstName is required')
        .isAlpha().withMessage('firstName should contain only alphabets')
        .isLength({ min: 2, max: 30 }).withMessage('firstName must be between 2 and 30 characters'),

        check('lastName')
        .not().isEmpty().withMessage("lastName can't be blank")
        .isAlpha().withMessage('lastName should contain only alphabets')
        .isLength({ min: 2, max: 30 }).withMessage('lastName must be between 2 and 30 characters'),

        check('email')
        .not().isEmpty().withMessage('email is required')
        .isEmail().withMessage('valid email is required')
        .isLength({ min: 5, max: 30 }).withMessage('email must be between 5 and 30 characters')
        .custom(value => validators.isUniqueEmail(value)).withMessage('email is already taken'),

        check('password')
        .not().isEmpty().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters in length.')
        .matches('[0-9]').withMessage('Password must contain at least 1 number.')
        .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
        .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
        .custom((value, { req }) => validators.passwordConfirmation(value, req)).withMessage("Passwords don't match."),
    ],

    userLoggingIn: [
        check('email')
        .not().isEmpty().withMessage('email adress is required')
        .isEmail().withMessage('Invalid email adddress'),

        check('password')
        .not().isEmpty().withMessage('password is required'),
    ],

    // meetups
    creatingMeetup: [
        check('userID')
        .not().isEmpty().withMessage('userID is required'),

        check('topic')
        .not().isEmpty().withMessage('topic is required'),

        check('location')
        .not().isEmpty().withMessage('meetup location is required'),

        check('city')
        .not().isEmpty().withMessage('meetup city is required'),

        check('startTime')
        .not().isEmpty().withMessage('start time is required')
        .custom((startTime, { req }) => validators.dateIsBefore(startTime, req.body.endTime)).withMessage('startTime should be before endTime'),

        check('endTime')
        .not().isEmpty().withMessage('end time is required')
        .custom((endTime, { req }) => validators.dateIsAfter(endTime, req.body.startTime)).withMessage('endTime should be after StartTime'),

        check('description')
        .not().isEmpty().withMessage('Give a brief description of meetup')
        .isLength({ min: 50 }).withMessage('Meeetup description should a minimum of 50 charaters'),
    ],
};