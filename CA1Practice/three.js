import express from 'express';
let app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{

    let name = req.query.name || "";

    res.send(`
        <form action="/submit" method="post" >
            <input type="text" name="name">
            <button type="submit">Submit</button>
        </form>

        <h2> Name : ${name} <h2>
        `);
})

app.post('/submit', (req, res)=>{
    res.redirect(`/?name=${req.body.name}`);
})

app.listen(3000);