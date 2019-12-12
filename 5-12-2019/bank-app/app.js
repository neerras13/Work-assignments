const express = require('express');
const server = express();
const parser = require('body-parser');
const cors = require('cors');

server.use(parser.json());
server.use(cors());


const userApi = require('./apis/user.api').server;
const tranApi = require('./apis/transaction-api').server;

server.use('/users', userApi);
server.use('/transaction',tranApi);

const PORT = 46767;
server.listen(PORT, () => {
    console.log(`Server is Started at ${PORT}`);
});