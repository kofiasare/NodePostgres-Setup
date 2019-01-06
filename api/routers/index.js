const { authController } = require('../controllers')

module.exports = {

    // base router
    baseRouter: (express) => {
        return express.Router()
            .get('/', (_, res) => res.json(info))
    },

    // auth router
    auth: (express) => {
        return express.Router()
            .post('/login', authController.login)
            .post('/signup', authController.signup)
    },

    // v1 router
    v1: require('./v1')
}


let info = {
    version: 1,
    docURL: 'https://postman.com/...'
}