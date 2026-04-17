import express from 'express';
import helmet from 'helmet';

let app = express();

app.use(helmet());

app.get('/', (req, res) => {
    res.send("security");
})

app.listen(3000);