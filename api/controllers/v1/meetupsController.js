import { meetupModel as meetup } from '../../models';

export default {

    index: (_, res) => {
        meetup.all()
            .then(meetups => res.json({ status: 200, data: meetups.rows }))
            .catch(error => console.log(error));
    },

    create: (req, res) => {
        meetup.create(req.body)
            .then(result => res.status(201).json({ status: 201, data: result.rows[0] }))
            .catch(error => console.log(error));
    },

    show: (req, res) => {
        meetup.find(req.params.meetupID)
            .then(_meetup => res.json({ status: 200, data: _meetup.rows[0] }))
            .catch(error => console.log(error));
    },

    update: (req, res) => {
        meetup.update(req.params.meetupID, req.body)
            .then(_meetup => res.json({ success: 200, data: _meetup }))
            .catch(error => console.log(error));
    },

    delete: (req, res) => {
        meetup.delete(req.params.meetupID)
            .then(res.status(204).end())
            .catch(error => console.log(error));
    },
};