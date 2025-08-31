require('dotenv').config();
const app = require('./src/app');
const {createServer} = require('http');
const connectToDb = require('./src/db/db');
const setUpSocket = require('./src/socket/socket');

const httpServer = createServer(app);
connectToDb()
setUpSocket(httpServer)

httpServer.listen(3000,()=>{
    console.log('server is running on port 3000')
})

