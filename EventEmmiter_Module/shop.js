import events from 'events';
import { setUncaughtExceptionCaptureCallback } from 'process';

let order = new events.EventEmitter();

let products = [
    {id: 101, name: "S20", stock:20},
    {id: 102, name: "S21", stock:15},
    {id: 103, name: "S22", stock:10},
    {id: 104, name: "S23", stock:5},

]


order.on("buy")