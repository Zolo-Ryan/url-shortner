const mongoose = require("mongoose");
const mongoString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/short-url';
mongoose.connect(mongoString);

const connection = mongoose.connection;

connection.once("open",() => console.log("Database connected successfully"));