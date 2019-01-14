import { validationResult } from 'express-validator/check';

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
};