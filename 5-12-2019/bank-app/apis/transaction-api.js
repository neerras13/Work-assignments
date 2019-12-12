const server = require('express').Router();

const user = require('../services/user-service').User;
const userObj = new user();

const trans = require('../services/transaction-service').Transaction;
const tranObj = new trans();
let withdraw=0;
let deposit=0;
let amount =0;


//send money to self
server.post('/deposit',(rq,rs)=>{
    amount = rq.body.amount;
    amount = parseInt(amount,10);
    userObj.fetchUser(rq.body.from,(err,res)=>{
        if(!err){
          if(amount<20000){}
          tranObj.update(rq.body.from,res[0].balance+amount);
          }
          else
          {
            rs.status(402).json({
                message: "Deposit limit exceeded",
                code: 0
            })   
          }
        });
    tranObj.sendMoney(rq.body,(err,res)=>{
        if(err)
        {
            rs.status(402).json({
                message: "Unable to transfer money",
                code: -1
            })
        }
        else
        {
            rs.status(200).json({
                message: "Amount self-transfer successful!",
                code: 1
            });
        }

    })
});


//withdraw
server.post('/withdraw',(rq,rs)=>{
    amount = rq.body.amount;
    amount = parseInt(amount,10);
    userObj.fetchUser(rq.body.from,(err,res)=>{
        if(!err){
        if(amount>res[0].balance)
          {
            rs.status(402).json({
                message: "Insufficient Balance",
                code: -1
            })
        }
        else if(amount>10000)  
        {
            rs.status(402).json({
                message: "Withdrawal limit exceeded",
                code: 0
            })
        }
        else
        {
            tranObj.update(rq.body.from,res[0].balance-amount);
        }
    }
    });
    
    tranObj.sendMoneyW(rq.body,(err,res)=>{
        if(err)
        {
            rs.status(402).json({
                message: "Unable to transfer money",
                code: -1
            })
        }
        else{
            rs.status(200).json({
                message: "Amount self-transfer successful!",
                code: 1
            });
        }

    })
})

//send money to another user
server.post('/sendUser',(rq,rs)=>{
    amount = rq.body.amount;
    amount = parseInt(amount,10);
    userObj.fetchUser(rq.body.from,(err,res)=>{
        if(amount<res[0].balance){
        tranObj.update(rq.body.from,res[0].balance-amount);
        }
        else
        {
            rs.status(402).json({
                message: "Insufficient balance",
                code: 0
            })           
        }

    });
    userObj.fetchUser(rq.body.to,(err,res)=>{
        if(amount<res[0].balance){
        tranObj.update(rq.body.to,res[0].balance+amount);
        }
    });


    tranObj.sendMoney(rq.body,(err,res)=>{
        if(err)
        {
            rs.status(402).json({
                message: "Unable to transfer money",
                code: -1
            })
        }
        else{
            rs.status(200).json({
                message: "Amount transfer successful!",
                code: 1
            });
        }

    })


  
});



module.exports={
    server
}