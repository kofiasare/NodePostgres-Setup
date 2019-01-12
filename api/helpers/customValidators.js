import { userModel } from '../models';

export default {

    isUniqueEmail: email => userModel.findByEmail(email)
        .then((result) => {
            if (result.rowCount !== 0) { return false; }
            return true;
        }),

    passwordConfirmation: (password, req) => {
        if (password !== req.body.passwordConfirm) { return false; }
        return true;
    },

};