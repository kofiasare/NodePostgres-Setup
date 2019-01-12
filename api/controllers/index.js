import { validationResult } from 'express-validator/check';
import { userModel as user } from '../models';
import { validations, utils } from '../helpers';
import v1Controllers from './v1';

const authController = {

    login: (req, res) => {
        const { email, password } = req.body;
        user.findByEmail(email)
            .then((_user) => {
                user.authenticate(_user, password)
                    .then(token => res.json({
                        status: 200,
                        data: { token, user: _user },
                    }))
                    .catch(error => res.status(400).json({
                        status: 400,
                        error,
                    }));
            })
            .catch(error => console.log(error));
    },

    signup: (req, res) => {
        const errors = validationResult(req).formatWith(validations.Formatter);
        if (!errors.isEmpty()) {
            res.status(422).json({ status: 422, error: errors.array() });
            return;
        }

        utils.hashPassword(req.body.password)
            .then((passwordDigest) => {
                const newUserParams = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    passwordDigest,
                };

                user.create(newUserParams)
                    .then((newUser) => {
                        res.status(201).json({
                            status: 201,
                            data: {
                                token: utils.generateAuthToken(),
                                user: newUser,
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error.stack);
                        res.end();
                    });
            });
    },
};

export {
    authController,
    v1Controllers,
};