import express from 'express';
let app = express();

import cookieSession from 'cookie-session';

app.use(cookieSession({
    name: "mysession",
    keys: ['key1'],
    maxAge: 30000,
}));


app.get("/login", (req, res)=>{
    req.session.username = "Abhijith";
    res.redirect("/dashboard");
})

app.get("/dashboard", (req, res)=>{
    if(req.session.username){
        res.send(`Welcome, user ${req.session.username}`);
    }else{
        res.send("Please login first");
    }
})

app.listen(3000);