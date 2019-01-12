export default db => ({

    all: () => {
        const query = `
                SELECT *
                FROM users
            `;
        return Promise.resolve(db.any(query));
    },

    create: (params) => {
        const query = {
            text: `
                INSERT INTO users(firstname, lastname, email, passworddigest)
                VALUES($1, $2, $3, $4)
                RETURNING *
            `,
            values: Object.values(params),
        };
        return Promise.resolve(db.query(query));
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

    // authenticate: (user, password) => {},
});