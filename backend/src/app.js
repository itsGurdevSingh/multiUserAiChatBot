const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const authRouter = require('./routers/auth.router');
const chatRouter = require('./routers/chat.router');

const app = express();

// For production behind HTTPS proxy
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Only needed for local dev if frontend is on different port
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/chat', chatRouter);

// Serve React build
app.use(express.static(path.join(__dirname, '../public')));

app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;
