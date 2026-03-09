import fs from 'fs';

let data = "this is some data";

fs.writeFile("./FileSystem_Module/files/writeSample.txt", data, "utf-8", (err) =>{
    if(err) console.log(err);
    else console.log("Data saved");
});



//writing a object. we have to use JSON.stringify();
let studentData = {
    name: "tom",
    address: "Delhi",
    marks: 82 
}

fs.writeFile("./FileSystem_Module/files/writeSampleObject.txt", JSON.stringify(studentData), "utf-8", (err) =>{
    if(err) console.log(err);
    else console.log("Data saved");
});