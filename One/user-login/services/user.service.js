const client = require('mongodb').MongoClient;
//const bcrypt = require('bcrypt');


class Service
{  
// verify user
fetchUser(_user, callback) {
   // const hashPassword = this.generateHash(_user.password);
    const _url = "mongodb://localhost:27017";
       client.connect(_url, (err, connection) => {
        connection.db("my-db").collection("users").find({ uid: _user.uid, password: _user.password }).toArray((err, response) => {
            callback(err, response);
        });
    });
}

// //hash for password
// generateHash(_pass) {
//     return bcrypt.hashSync(_pass, 1);
// }

//add user
addUser(_user,callback){
    const _url = "mongodb://localhost:27017";
       client.connect(_url, (err, connection) => {
        connection.db("my-db").collection("users").insert(_user, (err, response) => {
            callback(err, response);
        });
    });
}

}
module.exports = {
    UserService: Service
}