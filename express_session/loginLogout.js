import express from 'express';
import expressSession from 'express-session';

let app = express();

app.use(expressSession({
    secret: "key1",
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res)=>{
    res.send(`
        <form action="/dashboard" method="POST">
            Username : <input type="text" name="username"><br />
            Password : <input type="password" name="password"><br />
            <input type="submit" value="login">
        </form>
        `)
})

app.post("/dashboard", (req, res)=>{
    let {username, password} = req.body;
    req.session.user = {username: username, password:password};
    res.redirect("/dashboard")
})

app.get("/dashboard", (req, res)=>{
    if(req.session.user){
        res.send(`
            Welcome username ${req.session.user.username} <br />
            <a href="/logout">Logout</a>
            `);
    }else{
        res.redirect("/login");
    }
})

app.get("/logout", (req, res)=>{
    req.session.destroy( (err)=>{
        if(err) res.send("Error occured");
        else res.send(`logged out successfully </br> <a href="login">Login?<a>`)
    } )
})

app.listen(3000);