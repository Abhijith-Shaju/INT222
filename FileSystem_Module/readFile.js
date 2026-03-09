import fs from 'fs';

//Asynchronous
fs.readFile('./FileSystem_Module/files/sample.txt', 'utf-8', (err, data) => {
    if(err) console.log("Error: ", err);
    else console.log("Async: " ,data);
});

console.log("pepsi");



//Synchronous
try{
    let data = fs.readFileSync('./FileSystem_Module/files/samle.txt', 'utf-8');
    console.log("Sync: ", data);
}
catch (err){
    console.log("Sync Error: " + err.message);
}

console.log("fanta");