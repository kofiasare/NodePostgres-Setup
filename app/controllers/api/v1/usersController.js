const { user } = require('../../../models')

module.exports = {

    index: (_, res) => {
        user.all()
            .then(users => res.json({ success: 200, data: users }))
            .catch(error => {})
    },

    create: (req, res) => {
        user.create(req.body)
            .then(newUser => res.status(201).json({ success: 201, data: newUser }))
            .catch(error => console.log(error))
    },

    show: (req, res) => {
        user.find(req.params.userID)
            .then(user => res.json({ success: 200, data: user }))
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        user.update(req.params.userID, req.body)
            .then(user => res.json({ success: 200, data: user }))
            .catch(error => console.log(error))
    }
}