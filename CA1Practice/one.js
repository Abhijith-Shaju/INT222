import express from 'express';

let app = express();

app.get("/", (req, res) => {
    res.send(req.url + ", " + req.method);
})

app.listen(3000);