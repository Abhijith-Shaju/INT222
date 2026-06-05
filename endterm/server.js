import express from 'express';

let app = express();

app.use(express.urlencoded({extended: true}));

let math = (req, res, next)=>{
    let n1 = Number(req.body.n1);
    let n2 = Number(req.query.n2);
    
    res.send(`
        Add= ${n1 + n2}, 
        Sub= ${n1 - n2}, 
        Mul= ${n1 * n2}, 
        Div= ${n1 / n2}
        `)
}

app.get('/', (req, res)=>{
    res.send(`
        <form action="/submit" method="POST">
            <input type="text" name="n1">
            <input type="text" name="n2">
            <button type="submit">Submit</button>
        </form>
        `)
});

app.post('/submit', 
    // math(Number(req.body.n1)), 
    (req, res)=>{
    let n1 = Number(req.body.n1);
    let n2 = Number(req.body.n2);

    res.send(`
        Add= ${n1 + n2}, 
        Sub= ${n1 - n2}, 
        Mul= ${n1 * n2}, 
        Div= ${n1 / n2}
        `)
});


app.listen(3000);