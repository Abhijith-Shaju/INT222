import express from 'express';
import expressSession from 'express-session';

let app = express();

app.use(expressSession({
    secret: "key1",
    resave: 'false',
    saveUninitialized: 'false'
}))

app.get("/login", (req, res)=>{
    req.session.user = {username: "Abhijith", email: "abhijithshaju2004@gmail.com"};
    res.redirect("/dashboard");
});


app.get("/dashboard", (req, res)=>{
    if(req.session.user){
        res.send(`welcome user ${req.session.user.username}`)
    }else{
        res.send("Please login in");
    }
})

app.get("/logout", (req,res)=>{
    req.session.destroy((err)=>{
        if(err) res.send("Error while loggin out");
        
        setTimeout(()=>{
            console.log("Successfully logged out");
            res.redirect("/login");
        }, 3000);
    });
})

app.listen(3000);