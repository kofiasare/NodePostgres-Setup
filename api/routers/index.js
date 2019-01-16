import v1 from './v1';
import { authController } from '../controllers';
import { validations as validate, middleware } from '../helpers';


const info = {
    base: '/',
    auth: '/auth',
    v1: '/api/v1',
    docURL: 'https://postman.com/...',
};

export default {

    // base router
    base: express => express.Router()
        .get('/', (_, res) => res.json(info)),

    // auth router
    auth: express => express.Router()
        .post('/login', validate.userLoggingIn, middleware.reqBodyValidator, authController.login)
        .post('/signup', validate.userSigningUp, middleware.reqBodyValidator, authController.signup)
        .delete('/logout', authController.logout),

    // v1 router
    v1,
};