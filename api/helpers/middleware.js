/* eslint-disable indent */
import { validationResult } from 'express-validator/check';
import { meetupModel as meetup, userModel as user, questionModel as question } from '../models';

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
            case 'user':
                return (req, res, next) => {
                    const { userID } = req.params;
                    user.find(userID)
                        .then((_user) => {
                            if (_user.rowCount === 0) res.status(404).json({ status: 404, error: `user with id: ${userID} is not found` });
                            else next();
                        })
                        .catch(error => console.log(error));
                };

            case 'meetup':
                return (req, res, next) => {
                    const { meetupID } = req.params;
                    meetup.find(meetupID)
                        .then((_meetup) => {
                            if (_meetup.rowCount === 0) res.status(404).json({ status: 404, error: `meetup with id: ${meetupID} is not found` });
                            else next();
                        })
                        .catch(error => console.log(error));
                };

            case 'question':
                return (req, res, next) => {
                    const { questionID } = req.params;
                    question.find(questionID)
                        .then((_question) => {
                            if (_question.rowCount === 0) res.status(404).json({ status: 404, error: `question with id: ${questionID} is not found` });
                            else next();
                        })
                        .catch(error => console.log(error));
                };

            default:
        }
    },
};