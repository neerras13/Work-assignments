const server = require('express').Router();

const userService = require('../services/user.service').UserService;
const userObj = new userService();

server.get('/status', (rq, rs) => {
    rs.status(200).json({
        message: 'Service is Running'
    });
});

server.post('/login',(rq,rs)=>{
  
    userObj.fetchUser(rq.body, (err, res) => {
        if (err) {
            rs.status(402).json({
                message: 'Unable to proceess the request',
                trace: err,
                code: -1
            });
        } 
        else  if (res.length == 0) {
            rs.status(402).json({
                code: 0
            });
        } 
        else 
        {
                rs.status(200).json({
                    code: res[0].role
                                });
            }
    });
});



module.exports = {
    server
}
