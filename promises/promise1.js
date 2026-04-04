// async function fetchData() {
//     let fetchData = await fetch('https://jsonplaceholder.typicode.com/users');
//     console.log(await fetchData.json());
// };
// fetchData();

//the other way

fetch('https://jsonplaceholder.typicode.com/users')
    .then( (data) => data.json() )
    .then( (jsonData) => console.log(jsonData) )
    .catch( (error) => console.log(error) )


console.log(5);

