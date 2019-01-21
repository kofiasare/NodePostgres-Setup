import { userModel as user } from '../../models';

export default {

    index: (_, res) => {
        user.all()
            .then(users => res.json({ status: 200, data: users.rows }))
            .catch(error => console.log(error));
    },

    show: (req, res) => {
        user.find(req.params.userID)
            .then(_user => res.json({ status: 200, data: _user.rows[0] }))
            .catch(error => console.log(error));
    },

    update: (req, res) => {
        user.update(req.params.userID, req.body)
            .then(_user => res.json({ success: 200, data: _user }))
            .catch(error => console.log(error));
    },
};