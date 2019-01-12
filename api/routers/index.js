import v1 from './v1';
import { authController } from '../controllers';
import validator from '../helpers/validations';


const info = {
    v1: 1,
    docURL: 'https://postman.com/...',
};

export default {

    // base router
    baseRouter: express => express.Router()
        .get('/', (_, res) => res.json(info)),

    // auth router
    auth: express => express.Router()
        .post('/login', authController.login)
        .post('/signup', validator.createUser, authController.signup),

    // v1 router
    v1,
};