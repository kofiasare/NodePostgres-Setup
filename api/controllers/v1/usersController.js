import { userModel as user } from '../../models';

export default {

    index: (_, res) => {
        user.all()
            .then(users => res.json({ success: 200, data: users }))
            .catch((error) => { console.log(error); });
    },

    create: (req, res) => {
        user.create(req.body)
            .then(newUser => res.status(201).json({ success: 201, data: newUser }))
            .catch(error => console.log(error));
    },

    show: (req, res) => {
        user.find(req.params.userID)
            .then(_user => res.json({ success: 200, data: _user }))
            .catch(error => console.log(error));
    },

    update: (req, res) => {
        user.update(req.params.userID, req.body)
            .then(_user => res.json({ success: 200, data: _user }))
            .catch(error => console.log(error));
    },
};