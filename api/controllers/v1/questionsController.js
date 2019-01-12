import { questionModel as question } from '../../models';

export default {

    index: (_, res) => {
        question.all()
            .then(questions => res.json({ success: 200, data: questions }))
            .catch(error => console.log(error));
    },

    create: (req, res) => {
        question.create(req.body)
            .then(newQuestion => res.status(201).json({ success: 201, data: newQuestion }))
            .catch(error => console.log(error));
    },

    show: (req, res) => {
        question.find(req.params.questionID)
            .then(_question => res.json({ success: 200, data: _question }))
            .catch(error => console.log(error));
    },

    update: (req, res) => {
        question.update(req.params.questionID, req.body)
            .then(updatedQuestion => res.json({ success: 200, data: updatedQuestion }))
            .catch(error => console.log(error));
    },

    delete: (req, res) => {
        question.delete(req.params.questionID)
            .then(result => res.json({ success: 200, data: result.rowCount }))
            .catch(error => console.log(error));
    },

    upvote: (req, res) => {
        question.find(req.params.questionID)
            .then(_question => _question.upvote())
            .catch(error => console.log(error, req, res));
    },

    downvote: (req, res) => {
        question.find(req.params.questionID)
            .then(_question => console.log(_question))
            .catch(error => console.log(error, res));
    },
};