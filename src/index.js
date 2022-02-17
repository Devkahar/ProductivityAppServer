const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv');
const authRoutes  = require('./route/authRoute');
const todoRoute = require('./route/todoRoute');
const cors = require('cors');
dotenv.config();
const {connectDB} = require('./db/index');
app.use(cors());
app.use(express.json());
connectDB();
app.get('/hello/',(req,res)=>{
    res.send("Hello Dev Here")
})

app.use('/api',authRoutes);
app.use('/api',todoRoute);
app.listen(PORT,()=>{
    console.log("Server is listening on port " + PORT);
});