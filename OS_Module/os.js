import os from 'os'; 

console.log(typeof(os));
// console.log(os.cpus());
console.log(os.cpus().length);
console.log(os.platform());
console.log(os.arch());

console.log(os.userInfo().username);
