import { validationResult } from 'express-validator/check';
import { meetupModel as meetup } from '../models';

const errorFormatter = ({ msg }) => msg;

export default {

    reqBodyValidator: (req, res, next) => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            res.status(422).json({ status: 422, error: errors.array() });
            return;
        }
        next();
    },

    resourceExist: (resourceType) => {
        switch (resourceType) {
            case 'meetup':
                return function(req, res, next) {
                    const { meetupID } = req.params;
                    meetup.find(meetupID)
                        .then((_meetup) => {
                            if (_meetup.rowCount === 0) res.status(404).json({ status: 404, error: `meetup with id: ${meetupID} is not found` });
                            else next();
                        })
                        .catch(error => console.log(error));
                };
            default:
        }
    },
};