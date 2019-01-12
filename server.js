import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import routers from './api/routers';

const api = express();

api.use(bodyParser.json());
api.use('/', routers.baseRouter(express));
api.use('/auth', routers.auth(express));
api.use('/api/v1', routers.v1(express));

const port = config.get('port');
api.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default api;