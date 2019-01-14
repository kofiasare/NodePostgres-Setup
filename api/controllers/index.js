import { userModel as user } from '../models';
import v1Controllers from './v1';

const authController = {

    login: (req, res) => {
        const { email, password } = req.body;
        user.authenticate(email, password)
            .then((result) => {
                if (result.authenticated) {
                    res.set('Authorization', result.token).json({
                        status: 200,
                        data: { user: result.user },
                    });
                    return;
                }

                res.status(422).json({
                    status: 422,
                    error: 'Invalid login credentials',
                });
            })
            .catch(error => console.log(error));
    },

    signup: (req, res) => {
        user.create(req.body)
            .then((result) => {
                res.status(201)
                    .set('Authorization', result.token).json({
                        status: 201,
                        data: { user: result.newUser },
                    });
            })
            .catch(error => console.log(error));
    },
};

export {
    authController,
    v1Controllers,
};