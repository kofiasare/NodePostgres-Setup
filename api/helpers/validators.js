import { userModel as user } from '../models';

export default {

    isUniqueEmail: email => user.findByEmail(email)
        .then((result) => {
            if (result.rowCount !== 0) { return false; }
            return true;
        }),

    passwordConfirmation: (password, req) => {
        if (password !== req.body.passwordConfirm) { return false; }
        return true;
    },

    dateIsBefore: (date1, date2) => new Date(date1) < new Date(date2),
    dateIsAfter: (date1, date2) => new Date(date1) > new Date(date2),
};