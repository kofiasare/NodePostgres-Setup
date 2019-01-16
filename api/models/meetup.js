export default db => ({

    all: () => {
        const query = `
                SELECT *
                FROM meetups
            `;
        return Promise.resolve(db.query(query));
    },

    create: (params) => {
        const newMeetupParams = {
            topic: params.topic,
            description: params.description,
            location: params.location,
            city: params.city,
            image: params.image,
            startTime: params.startTime,
            endTime: params.endTime,
            userID: params.userID,
        };

        const query = {
            text: `
                INSERT INTO meetups(topic, description, location, city, image, starttime, endtime, userid)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `,
            values: Object.values(newMeetupParams),
        };

        return Promise.resolve(db.query(query));
    },

    find: (id) => {
        const query = {
            text: `
                SELECT *
                FROM meetups
                WHERE id=$1
            `,
            values: [id],
        };

        return Promise.resolve(db.query(query));
    },

    update: (id, params) => {
        const query = `
                UPDATE meetups
                SET name=$1, breed=$2, age=$3, sex=$4
                WHERE id= $5
                RETURNING *
            `;
        return Promise.resolve(db.one(query, [
            params.name,
            params.breed,
            params.age,
            params.sex,
            id,
        ]));
    },

    delete: (id) => {
        const query = {
            text: `
                DELETE
                FROM meetups
                WHERE id=$1
            `,
            values: [id],
        };

        return Promise.resolve(db.query(query));
    },
});