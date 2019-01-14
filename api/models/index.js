import config from 'config';
import { Client } from 'pg';

// models
import meetup from './meetup';
import user from './user';
import question from './question';
import comment from './comment';

// connect db
const db = new Client(config.get('db'));
db.connect();

// initialize models
const meetupModel = meetup(db);
const userModel = user(db);
const questionModel = question(db);
const commentModel = comment(db);


// export models
export {
    meetupModel,
    userModel,
    questionModel,
    commentModel,
};