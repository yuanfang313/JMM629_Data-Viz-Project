

let x;
let y;
let z;

x = 25;
y = 'string';
z = true;

x + z;
console.log(x + z);
x + y;
console.log(x + y);

let myArray = [1, 2, "string", true, 5, 6, 7, 8, 9];

let fruit = {kind: "orange",
             color: "orange",
             quantity: 9,
             tasty: true, };
let theFruits = [
    {kind: "orange",
    color: "orange",
    quantity: 19,
    tasty: true},

    {kind: "grapes",
    color: "green",
    quantity: 119,
    tasty: false},

    {kind: "banana",
    color: "yellow",
    quantity: 91,
    tasty: true}   
]

for (let index = 0; index < theFruits.length; index++) {
    //const element = array[index];
    //console.log(index);
    // get the kind of each fruit
    
    if (theFruits[index].tasty){
        console.log(theFruits[index].kind); 
    }  else {
        console.log(theFruits[index].kind + " is not tasty.");
        console.log(`${theFruits[index].kind} is not tasty.`);
    }
}


