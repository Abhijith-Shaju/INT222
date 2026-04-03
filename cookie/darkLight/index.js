import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();
app.use(express.static(__dirname));
app.use(cookieParser());

app.get("/", (req, res) =>{
    let theme = req.cookies.theme || "light";
    res.send(`
        <head>
        <link rel="stylesheet" href="./index.css">
        </head>
aaaA        <body class="${theme}">
        <h1> choose your theme </h1>
        <a href="/settheme/light"> <button> Light </button> </a>
        <a href="/settheme/dark"> <button> Dark </button> </a>
        </body>
        `)
})

app.get("/settheme/:mode", (req, res)=>{
    res.cookie("theme", req.params.mode === 'light' ? "light" : "dark");
    res.redirect("/");
})

app.listen(3000);