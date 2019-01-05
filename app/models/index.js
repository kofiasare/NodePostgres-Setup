const config = require('config');
const pgp = require('pg-promise')({
    promiseLib: require('bluebird'),
})

// connect db
const db = pgp(config.get('dbConfig'));

// require models
const meetup = require('./meetup')(db)
const user = require('./user')(db)

// add models
module.exports = {
    meetup,
    user
}