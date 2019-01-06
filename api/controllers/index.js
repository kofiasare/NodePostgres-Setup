const v1Controllers = require('./v1')
const { user } = require('../models/')

const authController = {

    login: (req, res) => {
        let { email, password } = req.body
        user.findByEmail(email)
            .then(_user => {
                user.authenticate(_user, password)
                    .then(token => res.json({
                        status: 200,
                        data: {
                            token: token,
                            user: _user
                        }
                    }))
                    .catch(error => res.status(400).json({
                        status: 400,
                        error: error
                    }))
            })
            .catch(error => console.log(error))
    },

    signup: (req, res) => {}
}

module.exports = {
    authController,
    v1Controllers
}