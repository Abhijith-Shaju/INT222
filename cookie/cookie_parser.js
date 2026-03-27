import express from 'express';
import cookieParser from 'cookie-parser';


let app = express();

app.use(cookieParser());

app.get("/saveCookie", (req, res) => {
    res.cookie("username", "Abhijith");
    res.cookie("email", "Abhijith@gmail.com");
    res.send("Cookie has been sent!")
})

app.get("/getCookie", (req, res)=>{
    res.send(req.cookies);
    console.log(req.cookies);
})

app.get("/removeCookie", (req, res)=>{
    res.clearCookie("username");
    res.clearCookie("email");
    res.send("Cookie has been deleted");
})
app.listen(3000)