const mongoose = require('mongoose');
const User = require('../model/userModel')
const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    todo:[
        {
            todoType: {
                type: String,
                enum: ['programmer', 'GYM','general','student','project','meetings','contest'],
                default: 'general',
            },
            tasks:[{
                name:{
                    type: String,
                },
                priority: {
                    type: Number,
                },
                link: {
                    type: String,
                },
                startTime:{
                    type: String,
                },
                websiteName:{
                    type: String,
                },
                duration:{
                    type: String,
                },
                status:{
                    type: Boolean,
                }
            }]
        }
    ],
    date: {
        type: String,
    },
},{
    timestamps: true,
})
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;