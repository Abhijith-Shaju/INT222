import fs from "fs";

let readStream = fs.createReadStream( "./Streams/pizza.txt", {encoding : "utf-8", start: 2, end: 9} );

readStream.on("data", (chunk)=>{
    console.log(chunk);
})

readStream.on("end", ()=>{
    console.log("This needs to be used only when the file has been read");
})

readStream.on("error", (err)=>{
    console.log(`There has been an error in reading the file : ${err.messange}`);
})