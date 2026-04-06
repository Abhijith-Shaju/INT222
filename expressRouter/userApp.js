import express from 'express';
let app = express();

import router from './userRoutes.js';

app.use('/lpu', router);

app.listen(3000);