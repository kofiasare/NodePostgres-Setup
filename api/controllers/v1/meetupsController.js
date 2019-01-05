const { meetup } = require('../../models')

module.exports = {

    index: (_, res) => {
        meetup.all()
            .then(meetups => res.json({ success: 200, data: meetups }))
            .catch(error => {})
    },

    create: (req, res) => {
        meetup.create(req.body)
            .then(newMeetup => res.status(201).json({ success: 201, data: newMeetup }))
            .catch(error => console.log(error))
    },

    show: (req, res) => {
        meetup.find(req.params.meetupID)
            .then(meetup => res.json({ success: 200, data: meetup }))
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        meetup.update(req.params.meetupID, req.body)
            .then(meetup => res.json({ success: 200, data: meetup }))
            .catch(error => console.log(error))
    },

    delete: (req, res) => {
        meetup.delete(req.params.meetupID)
            .then(result => res.json({ success: 200, data: result.rowCount }))
            .catch(error => console.log(error))
    }
}