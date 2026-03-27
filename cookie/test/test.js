import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let app = express();
app.use(express.static('public'))

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "test.html"));
})

app.listen(3000);