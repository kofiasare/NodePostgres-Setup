const { v1Controllers } = require('../controllers')

module.exports = (express) => {
    const v1 = express.Router()
    v1.get('/', (_, res) => res.json(info));

    // meetups
    v1.get('/meetups', v1Controllers.meetupsController.index);
    v1.post('/meetups', v1Controllers.meetupsController.create);
    v1.get('/meetups/:meetupID', v1Controllers.meetupsController.show);
    v1.put('/meetups/:meetupID', v1Controllers.meetupsController.update);
    v1.delete('/meetups/:meetupID', v1Controllers.meetupsController.delete);

    // users
    v1.get('/users', v1Controllers.usersController.index);
    v1.post('/users', v1Controllers.usersController.create);
    v1.get('/users/:userID', v1Controllers.usersController.show);
    v1.put('/users/:userID', v1Controllers.usersController.update);

    // questions
    v1.get('/questions', v1Controllers.usersController.index);
    v1.post('/questions', v1Controllers.usersController.create);
    v1.get('/questions/:userID', v1Controllers.usersController.show);
    v1.patch('/questions/:questionID/upvote', v1Controllers.questionsController.upvote)
    v1.patch('/questions/:questionID/downvote', v1Controllers.questionsController.downvote)

    return v1;
}

let info = {
    version: 1,
    docURL: 'https://postman.com/...'
}