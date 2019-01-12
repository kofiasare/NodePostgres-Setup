import { meetupModel as meetup } from '../../models';

export default {

    index: (_, res) => {
        meetup.all()
            .then(meetups => res.json({ success: 200, data: meetups.rows }))
            .catch(error => console.log(error));
    },

    create: (req, res) => {
        meetup.create(req.body)
            .then(newMeetup => res.status(201).json({ success: 201, data: newMeetup }))
            .catch(error => console.log(error));
    },

    show: (req, res) => {
        meetup.find(req.params.meetupID)
            .then(_meetup => res.json({ success: 200, data: _meetup }))
            .catch(error => console.log(error));
    },

    update: (req, res) => {
        meetup.update(req.params.meetupID, req.body)
            .then(_meetup => res.json({ success: 200, data: _meetup }))
            .catch(error => console.log(error));
    },

    delete: (req, res) => {
        meetup.delete(req.params.meetupID)
            .then(result => res.json({ success: 200, data: result.rowCount }))
            .catch(error => console.log(error));
    },
};