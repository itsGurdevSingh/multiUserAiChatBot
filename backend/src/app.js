const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const authRouter = require('./routers/auth.router')
const chatRouter = require('./routers/chat.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
  origin: "http://localhost:5173",  // 👈 your frontend URL
  credentials: true                 // 👈 allow cookies
}));
app.use(cookieParser());

app.use('/auth',authRouter)
app.use('/chat',chatRouter)

app.get('/message',(req,res) =>{
    console.log('api hits')
    res.json({
        msg:'api works sucessfully'
    })
})

module.exports = app;


