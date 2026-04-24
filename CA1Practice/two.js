import express from 'express';
let app = express();

app.get("/", (req, res)=>{
    res.send("root");
})

app.get("/home", (req, res)=>{
    res.send("home");
})

app.get("/:x", (req, res)=>{
    res.send("404");
})

app.listen(3000);