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
                enum: ['programmer', 'GYM','general','student'],
                default: 'general',
            },
            tasks:[{
                taskType:{
                    type: String,
                    enum: ['link','text','meetingLink','problem',"video"],
                    default: 'text',
                },
                time: {
                    type: String,
                },
                priority: {
                    type: Number,
                },
                link: {
                    type: String,
                },
                status: {
                    type: String,
                },

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