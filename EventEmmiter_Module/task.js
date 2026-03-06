import events from 'events';

let cal = new events.EventEmitter();

cal.addListener("Cal", ( name, ...marks )=>{
    console.log(`name : ${ name }, CGPA : ${ marks.reduce( (a, b) => a + b ) / marks.length }` );
})

cal.emit("Cal", "Abhijith", 90, 80, 90, 62, 99);
cal.emit("Cal", "John", 40, 70, 50, 72, 89);
cal.emit("Cal", "Tom", 40, 80, 60, 62, 79);