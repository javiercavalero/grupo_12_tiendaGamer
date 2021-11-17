let usersJSON = require('./data/users.json');

let users = usersJSON.map (user => {
 let item = {
     ...user,
     createdAt: new Date(),
 }   
 return item;
})
console.log(users);