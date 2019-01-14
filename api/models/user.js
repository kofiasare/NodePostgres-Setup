import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const generateAuthToken = userID => jwt.sign({ userID }, config.get('secret'), config.get('jwt'));

// const verifyAuthToken = (token) => {
//     jwt.verify(token);
// };

export default db => ({

    all: () => {
        const query = `
                SELECT *
                FROM users
            `;
        return Promise.resolve(db.any(query));
    },

    find: (id) => {
        const query = `
                SELECT *
                FROM users
                WHERE id = $1
            `;
        return Promise.resolve(db.one(query, id));
    },

    findByEmail: (email) => {
        const query = {
            text: `
            SELECT *
            FROM users
            WHERE email = $1
        `,
            values: [email],
        };
        return Promise.resolve(db.query(query));
    },

    update: (id, params) => {
        const query = {
            text: `
                UPDATE users
                SET name=$1, breed=$2, age=$3, sex=$4
                WHERE id= $5
                RETURNING *
            `,
            values: [],
        };

        return Promise.resolve(db.one(query, [
            params.name,
            params.breed,
            params.age,
            params.sex,
            id,
        ]));
    },

    delete: (id) => {
        const query = `
               DELETE
               FROM users
               WHERE id=$1
            `;
        return Promise.resolve(db.result(query, id));
    },


    create(params) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(params.password, 10)
                .then((passwordDigest) => {
                    const newUserParams = {
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email: params.email,
                        passwordDigest,
                    };

                    const query = {
                        text: `
                            INSERT INTO users(firstname, lastname, email, passworddigest)
                            VALUES($1, $2, $3, $4)
                            RETURNING *
                        `,
                        values: Object.values(newUserParams),
                    };

                    db.query(query)
                        .then((result) => {
                            const newUser = result.rows[0];
                            const token = generateAuthToken(newUser.id);
                            resolve({ newUser, token });
                        })
                        .catch(error => reject(error));
                });
        });
    },

    authenticate(email, password) {
        return new Promise((resolve, reject) => {
            this.findByEmail(email)
                .then(((result) => {
                    const user = result.rows[0];
                    if (user === undefined) {
                        resolve({ authenticated: false });
                        return;
                    }

                    const token = generateAuthToken(user.id);
                    bcrypt.compare(password, user.passworddigest)
                        .then((authenticated) => { resolve({ authenticated, user, token }); })
                        .catch(error => reject(error));
                }))
                .catch(error => reject(error));
        });
    },
});