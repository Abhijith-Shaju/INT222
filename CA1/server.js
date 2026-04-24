import express from 'express';
import fs from 'fs';
import cookieparser from 'cookie-parser';

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
    let recent = req.cookies.recent || [];

    res.send(`
        <h1>File Tracker</h1>
        <form method="post">
            <input type="text" name="book">
            <button type="submit">Submit</button>
        </form>
        <p>
        Recently Viewed : ${recent.join(', ')}
        </p>
        `)
});

app.post('/', (req, res) => {
    let book = req.body.book;
    let data;
    try{
        data = fs.readFileSync(book);
    }catch(err){
        data = "File not found";
    }

    let ws = fs.createWriteStream("./filelog.txt", {flags: 'a'});
    let time = new Date();
    ws.write(`${book} :: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} \n`);
    
    let recent = req.cookies.recent || [];

    if(recent.length >= 3){
        recent.pop();
    }
    recent.unshift(book);
    res.cookie("recent", recent);

    res.send(`
            <h1>Viewing: ${book}</h1>
            <p>${data}</p><br />
            <a href="/">Back</a>
        `)
});


app.listen(3000);