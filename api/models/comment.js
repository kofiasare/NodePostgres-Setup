module.exports = (db) => {
    return {

        all: () => {
            let query = `
                SELECT *
                FROM comments
            `
            return Promise.resolve(db.any(query));
        },

        create: (params) => {
            let query = `
                INSERT INTO comments(name, breed, age, sex)
                VALUES($(name), $(breed), $(age), $(sex))
                RETURNING *
            `
            return Promise.resolve(db.one(query, params));
        },

        find: (id) => {
            let query = `
                SELECT *
                FROM comments
                WHERE id = $1
            `
            return Promise.resolve(db.one(query, id))
        },

        update: (id, params) => {
            let query = `
                UPDATE comments
                SET name=$1, breed=$2, age=$3, sex=$4
                WHERE id= $5
                RETURNING *
            `
            return Promise.resolve(db.one(query, [
                params.name,
                params.breed,
                params.age,
                params.sex,
                id
            ]))
        },

        delete: (id) => {
            let query = `
               DELETE
               FROM comments
               WHERE id=$1
            `
            return Promise.resolve(db.result(query, id))
        }
    }
}