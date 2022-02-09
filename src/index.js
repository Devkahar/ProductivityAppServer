const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv');
const authRoutes  = require('./route/authRoute');
dotenv.config();
const {connectDB} = require('./db/index');

app.use(express.json());
connectDB();
app.get('/hello/',(req,res)=>{
    res.send("Hello Dev Here")
})
app.use('/api',authRoutes);
app.listen(PORT,()=>{
    console.log("Server is listening on port " + PORT);
})