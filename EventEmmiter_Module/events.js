import events from 'events';

// let booking = new events.EventEmitter();

// booking.on("bookingevent", (user)=>{
//     console.log(`email Recieved ${user}`);
// })

// booking.on("bookingevent", (user)=>{
//     console.log(`booking Recieved for ${user}`);
// })

// booking.on("bookingevent", (user, typeofseat)=>{
//     console.log(`seat reseerved for :  ${user} in ${typeofseat}`);
// })

// booking.emit("bookingevent", "abhijith", "regular");



//function method
function order(user, seat){
    let booking = new events.EventEmitter();

    booking.on("bookingevent", (user)=>{
        console.log(`email Recieved ${user}`);
    })

    booking.on("bookingevent", (user)=>{
        console.log(`booking Recieved for ${user}`);
    })

    booking.on("bookingevent", (user, typeofseat)=>{
        console.log(`seat reseerved for :  ${user} in ${typeofseat}`);
    })

    booking.emit("bookingevent", user, seat);
}

order("Abhijith" , "Regular");
order("sam" , "Premium");
order("tom" , "Regular");