import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let app = express();


app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "validator.html"));
    
})

app.post('/submit', [
        body("username").notEmpty().withMessage("name is mandatory!"),
        body("email").isEmail().withMessage("Email is not Valid"),
        body("password").isLength({min: 3, max:10}).withMessage("Create a valid password")
    ], (req, res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            let errorMessages = errors.array().map( (err) => `<li>${err.msg}</li>` ).join("");
            return res.send(`<ul>${errorMessages}</ul>`)
        }else{
            res.send("form subitted");
        }
})


app.listen(3000);