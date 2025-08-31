const mongoose = require('mongoose');

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('connected to db'))
    .catch(err => console.log('falid to connect to db', err.message))
}

module.exports = connectToDb;