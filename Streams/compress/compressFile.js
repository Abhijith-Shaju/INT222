import fs from "fs";
import zlib from "zlib";

let r = fs.createReadStream("./Streams/compress/someData.txt");
let w = fs.createWriteStream("./Streams/compress/dat.gz");

let gzip = zlib.createGzip();

r.pipe(gzip).pipe(w);