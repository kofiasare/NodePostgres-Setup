const { question } = require('../../models')

module.exports = {

    index: (_, res) => {
        question.all()
            .then(question => res.json({ success: 200, data: question }))
            .catch(error => {})
    },

    create: (req, res) => {
        question.create(req.body)
            .then(newQuestion => res.status(201).json({ success: 201, data: newQuestion }))
            .catch(error => console.log(error))
    },

    show: (req, res) => {
        question.find(req.params.questionID)
            .then(question => res.json({ success: 200, data: question }))
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        question.update(req.params.questionID, req.body)
            .then(updatedQuestion => res.json({ success: 200, data: updatedQuestion }))
            .catch(error => console.log(error))
    },

    delete: (req, res) => {
        question.delete(req.params.questionID)
            .then(result => res.json({ success: 200, data: result.rowCount }))
            .catch(error => console.log(error))
    },

    upvote: (req, res) => {
        question.find(req.params.questionID)
            .then(question => question.upvote())
            .catch(error => console.log(error))
    },

    downvote: (req, res) => {
        question.find(req.params.questionID)
            .then(question => console.log(question))
            .catch(error => console.log(error))
    }
}