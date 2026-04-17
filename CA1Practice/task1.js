import express from 'express';
let app = express();

// import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import fs from 'fs';

app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send(`
        <h1>Set Cookie Example</h1>
        <form method="get" action="/set">
        Course : <input id="course" type="text" name="course"></br>
        user : <input id="user" type="text" name="user"></br>

        <button type="submit">Submit</button>

        `)
})

app.get('/set', (req, res) => {
    const courseName = req.query.course;
    const userName = req.query.user;

    res.cookie("course", courseName, {maxAge: 60000});
    res.cookie("user", userName, {maxAge: 60000});

    let writeStream = fs.createWriteStream("./cookieData", {encoding: "utf-8"})
    writeStream.write(`Course : ${courseName}, user: ${userName}`);

    res.send(`
        <h1>Cookie has been set for 1 minute</h1>
        Course: ${courseName}</ br>
        User: ${userName}

        <a href="/clear" > Clear Cookie </a>
        `)
})

app.get('/clear', (req, res) => {
    res.clearCookie("course");
    res.clearCookie("user");

    res.redirect("/");
})


app.listen(3000)