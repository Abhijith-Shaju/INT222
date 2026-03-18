import zlib from "zlib";
let data = "This is node js class data";

zlib.gzip(data, (err, buffer)=>{
    if(err) console.log("Error is compression");
    else{
        console.log("The compressed data is " + buffer.toString());
        
        zlib.gunzip(buffer, (err, buf)=>{
            if(err) console.log("Error in decompression");
            else{
                console.log("this is the decompressed data : " + buf);
            }
        })
    }
})