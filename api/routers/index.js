const apiController = require('../controllers')

// sub-routers
const v1 = require('./v1')

// base router
const apiRouter = (express) => {
    const baseRouter = express.Router()
    baseRouter.get('/', (_, res) => res.json(info))
    return baseRouter
}

module.exports = { v1, apiRouter }



let info = {
    version: 1,
    docURL: 'https://postman.com/...'
}