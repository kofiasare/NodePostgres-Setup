import bcrypt from 'bcrypt';

export default {
    hashPassword: password => Promise.resolve(bcrypt.hash(password, 10)),
    comparePasswordAndHash: (password, hash) => Promise.resolve(bcrypt.compare(password, hash)),
    genetateAuthToken: () => {},
};