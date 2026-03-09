import events from 'events';
let products = [
    {id: 101, name: "S20", price: 15000, stock:20},
    {id: 102, name: "S21", price: 25000, stock:15},
    {id: 103, name: "S22", price: 35000, stock:10},
    {id: 104, name: "S23", price: 45000, stock:5},
]

function shop(user, id, quantity){
    let order = new events.EventEmitter();
    let product = products.find( p => p.id === id);

    order.on("buy", (user, quantity) => {
        console.log( `${user} bought ${quantity} ${product.name}` );
        product.stock -= quantity;
    })

    order.on("check", (user, product, quantity) => {
        if(!product || quantity <= 0){
            console.log("Order Failed.");
            return;
        }
        if(product.stock >= quantity){
            order.emit("buy", user, quantity);
        }else{
            console.log("Stock does not contain the required amount!");
        }
    })

    order.emit("check", user, product, quantity);
}

shop("Abhijith", 104, 5);
shop("Tom", 104, 3);
shop("Sam", 102, 13);
shop("Sam", 102, 13);

shop("Sam", 100, 13);

console.log(products);