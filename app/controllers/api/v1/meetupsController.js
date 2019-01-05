const { meetup } = require('../../../models')

module.exports = {

    index: (_, res) => {
        meetup.all()
            .then(data => res.json({ success: 200, data: data }))
            .catch(error => {})
    },

    create: (req, res) => {
        meetup.create(req.body)
            .then(data => res.status(201).json({ success: 201, data: data }))
            .catch(error => console.log(error))
    },

    show: (req, res) => {
        meetup.find(req.params.meetupID)
            .then(data => res.json({ success: 200, data: data }))
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        meetup.update(req.params.meetupID, req.body)
            .then(data => res.json({ success: 200, data: data }))
            .catch(error => console.log(error))
    },

    delete: (req, res) => {
        meetup.delete(req.params.meetupID)
            .then(result => res.json({ success: 200, data: result.rowCount }))
            .catch(error => console.log(error))
    }
}