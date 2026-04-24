import express from 'express';
import fs from 'fs';
import event from 'events';

let app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    let data;
    try{
        data = fs.readFileSync("./data.text");
    }catch(err){
        data = "No data in the file";
    }
    res.send(`
        <h1>Real-Time File Writer</h1>
        <form method="post" action="/submit" name="form">
        <textarea name="text"></textarea> <br />
        <button type="submit"> Submit </button>
        </form>
        <p>${data}</p>
        `)
    })
    
app.post("/submit", (req, res) => {
    let writeStream = fs.createWriteStream("./data.text", {flags: "a"});
    let data = req.body.text;
    writeStream.write(data + "\n");

    res.redirect("/");
})

app.listen(3000);