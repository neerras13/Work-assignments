const client = require('mongodb').MongoClient;

class Transaction{

    fetchTransaction(_user,callback){
        console.log(_user);
        const _url = "mongodb://localhost:27017";
        client.connect(_url, (err, connection) => {
         connection.db("my-db").collection("transaction").find({$or:[{from: _user},{to: _user}]}).toArray((err, response) => {
             callback(err, response);
         });
     });  
    }

    sendMoney(_user,callback){
        var d = new Date();
        const _url = "mongodb://localhost:27017";
        let userDetails = {
            from : _user.from,
            to : _user.to,
            amount: _user.amount,
            date: d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+"  "+d.getHours()+":"+d.getMinutes()
        };
        client.connect(_url, (err, connection) => {
         connection.db("my-db").collection("transaction").insert(userDetails, (err, response) => {
             callback(err, response);
         });
     });
    }
    sendMoneyW(_user,callback){
        var d = new Date();
        var a = 0-_user.amount;
        const _url = "mongodb://localhost:27017";
        let userDetails = {
            from : _user.from,
            to : _user.to,
            amount: a,
            date: d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+"  "+d.getHours()+":"+d.getMinutes()
        };
        console.log(userDetails);
        client.connect(_url, (err, connection) => {
         connection.db("my-db").collection("transaction").insert(userDetails, (err, response) => {
             callback(err, response);
         });
     });
    }

    update(_user,values){
        const _url = "mongodb://localhost:27017";
        client.connect(_url, (err, connection) => {
         connection.db("my-db").collection("user").updateOne({uid:_user},{$set:{balance: values}}, (err, response) => {
            if (err) throw err;
            console.log("1 document updated");
         });
     });
    }

}

module.exports={
    Transaction
}