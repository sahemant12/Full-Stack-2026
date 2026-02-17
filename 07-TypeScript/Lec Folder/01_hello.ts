
// E.g-1: 
let x: number = 10;
let isTrue: boolean = false;
let fname: string | null = null;

// E.g-2:
function add(x: number, y: number){
    return x+y;
}

let ans: number = add(5, 6);
console.log(ans);

// E.g-3:
function createUser(user: {firstname: string, lastname?: string}){ // user type is object.
    console.log(user.firstname);
    console.log(user.lastname);  
    
}
createUser({
    firstname: "Hemant"
})

// E.g-4:
interface  User{ // means making our own type
    firstName: string;
    lastName?: string;
    email: string;
    profileImageURL?: string;
}

function updateUser(user: User){
    user;
}
updateUser({
    firstName: "Hemant",
    email: "hem@gmail.com",
});