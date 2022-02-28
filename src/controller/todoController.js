const TodoModel = require('../model/todoModel.js');
const User = require('../model/userModel.js');
const Todo = require('../dataStructures/todoStructure.js');
// @desc    Create New ToDo.
// @route   POST /api/todo/create
const createToDo = async (req, res) => {
    try {
        const {_id,listData,date} = req.body;
        listData.map(el => {
            const data = new Todo(el.tasks,el.type);
            return data;
        });
        const _newToDo = new TodoModel({user:_id,todo:listData,date});
        const _data = await _newToDo.save();
        if(_data && await User.findByIdAndUpdate({_id},{$push: {userToDo: _data}})){
            res.status(201).json({
                todoData: _data.todo,
                date: _data.date,
            })
        }else{
            res.status(404).json({type: error,message: "Some Thing Went Wrong"});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}
const updateToDo ={

}

module.exports ={
    createToDo,
    updateToDo,
}
