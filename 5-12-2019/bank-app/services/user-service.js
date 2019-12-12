const client = require('mongodb').MongoClient;

class User{


fetchUser(_user, callback) {
     const _url = "mongodb://localhost:27017";
        client.connect(_url, (err, connection) => {
         connection.db("my-db").collection("user").find({ uid: _user}).toArray((err, response) => {
             callback(err, response);
         });
     });
 }

 fetchUserAcc(_user, callback) {
    const _url = "mongodb://localhost:27017";
       client.connect(_url, (err, connection) => {
        connection.db("my-db").collection("user").find({ acc_no: _user}).toArray((err, response) => {
            callback(err, response);
        });
    });
}

fetchUserEmail(_user, callback) {
    const _url = "mongodb://localhost:27017";
       client.connect(_url, (err, connection) => {
        connection.db("my-db").collection("user").find({ email: _user}).toArray((err, response) => {
            callback(err, response);
        });
    });
}


 verifyUser(_user,callback){
    const _url = "mongodb://localhost:27017";
    client.connect(_url, (err, connection) => {
     connection.db("my-db").collection("user").find({ uid: _user.uid,password:_user.password}).toArray((err, response) => {
         callback(err, response);
     });
 });
 }

 addUser(_user,callback){
    const _url = "mongodb://localhost:27017";
    client.connect(_url, (err, connection) => {
     connection.db("my-db").collection("user").insert(_user,(err, response) => {
         callback(err, response);
     });
 });
 }

}


module.exports={
    User
}