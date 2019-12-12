const server = require('express').Router();

const user = require('../services/user-service').User;
const userObj = new user();

const trans = require('../services/transaction-service').Transaction;
const tranObj = new trans();

server.get('/status', (rq, rs) => {
    rs.status(200).json({
        message: 'Service is Running'
    });
});



server.post('/login',(rq,rs)=>{

    userObj.verifyUser(rq.body, (err, res) => {
        if(err)
        {      
            rs.status(401).json({
            message:"Server error",
            code: -1,
            });
        }
        else  if (res.length == 0) {
                rs.status(402).json({
                message: 'Wrong password',
                code: 0
            });
        }
        else{
            rs.status(200).json({
                message:"Successful login!",
                code: 1,
                body:res
            })
        }
    
    });
});

server.get('/history/:uid',(rq,rs)=>{
    tranObj.fetchTransaction(rq.params.uid,(err,res)=>{
        if(err){
            rs.status(400).json({
                message: 'No transaction found',
                code: -1
            });
        }
        else
        rs.status(201).json({
            message: 'Found',
            data: res
        })
    })
});

server.get('/balance/:uid',(rq,rs)=>{
console.log("uid = "+rq.params.uid);
userObj.fetchUser(rq.params.uid,(err,res)=>{
    if(res[0] != null)
    {
        console.log(res);
        rs.status(201).json({
            message: "Success",
            balance: res[0].balance
        })
    }
})
});

server.post('/signup',(rq,rs)=>{

userObj.fetchUserAcc((rq.body.acc_no),(err,res)=>{
    if(res.length != 0){  
    rs.status(400).json({
        message: "User already exists",
        code: -1
    })
    }
    else
    {
        userObj.fetchUserEmail((rq.body.email),(err,res)=>{
        if(res.length != 0){  
            rs.status(400).json({
            message: "Not a unique email",
            code: 0
             })
            }
        else
        {
            userObj.addUser(rq.body,(err,res)=>{
                if(!err)
                {
                    console.log(res);
                    rs.status(201).json({
                        message: "Success",
                        data: rq.body,
                        code: 1
                    })
                }
            })
        }    
        })
        
    }
})

});


server.post('/loginNew',(rq,rs)=>{

    userObj.fetchUser(rq.body.uid, (err, res) => {
        if(err)
        {      
            rs.status(401).json({
            message:"Server error",
            code: 2,
            });
        }
        else  if (res.length == 0) {
                rs.status(402).json({
                message: 'Incorrect User Id. Please sign up!',
                code: 0
            });
        }
        else{
            if(res[0].password == rq.body.password)
           { rs.status(200).json({
                message:"Successful login!",
                code: 1,
                body:res
            })}
            else{
                rs.status(400).json({
                    message: "Wrong password",
                    code: -1
                });
            }
        }
    
    });
});
    





module.exports={
    server
}