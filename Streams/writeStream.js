import fs from "fs";

let writeStream = fs.createWriteStream("./Streams/pizza.txt", {encoding: "utf-8"});

writeStream.write("this is the food we got from write");

writeStream.end( ()=>{
    let readStream = fs.createReadStream("./Streams/pizza.txt", {encoding: "utf-8"});

    readStream.on("data", (chunk)=>{
    console.log(chunk);
    })
});

writeStream.on("finish", ()=>{
    console.log("finished writing into the file")
})

writeStream.on("error", (err)=>{
    console.log("Error is writing the file");
})