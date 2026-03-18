import http from "http";
import fs from "fs";
import { EventEmitter } from "events";

const server = http.createServer( (req, res) =>{

    const event = new EventEmitter();
    event.on("readData", (arr) => {
        let map = arr.map( (ele) => {
            return (`<tr>
                        <td>${ele.id}</td>
                        <td>${ele.name}</td>
                        <td>${ele.price}</td>
                    </tr>`);
        } ).join("");

        res.writeHead(200, {"content-type": 'text/html'})
        res.end(`
            <table border=1>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                ${map}
            </table>
            `);
    });

    if(req.url === "/"){
        res.writeHead(200, {'content-type' : 'text/html'});
        res.end(`
            <h3>Click here to fetch the data </h3>
            <a href="/fetch"><button>Fetch Data</button></a>
            `);
    }
    else if(req.url === "/fetch"){
        fs.readFile("products.json", "utf-8", (err, data)=>{
            if(err){
                res.writeHead(404, {"content-type" : "text/html"});
                res.end(`<p>No Data Found</p>`);
            }else{
                let arr = JSON.parse(data);
                event.emit("readData", arr);
            }
        });
    }else{
        res.writeHead(200, {"content-type" : "text/html"});
        res.end("Page not found")
    }
});



server.listen(3000);