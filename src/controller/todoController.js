const Todo = require('../model/todoModel.js');
const User = require('../model/userModel.js');

// @desc    Create New ToDo.
// @route   POST /api/todo/create
const createToDo = async (req, res) => {
    try {
        const {_id,listData,date} = req.body;
        console.log(['general']);
        const todoExist = await Todo.findOne({user: _id,date});
        if(todoExist){
            const upDatedData = await Todo.findOneAndUpdate({user: _id,date},{$set:{todo: listData}},{upsert: true,returnDocument: 'after',});
            console.log("Hey We have Up Data",upDatedData);
            res.status(201).json({
                todoData: upDatedData.todo,
                date: upDatedData.date,
            })
        }else{
            const _newToDo = new Todo({user:_id,todo:listData,date});
            const _data = await _newToDo.save();
            if(_data){
                res.status(201).json({
                    todoData: _data.todo,
                    date: _data.date,
                })
            }else{
                console.log("Fuck");
                res.status(401).json({type: error,message: "Some Thing Went Wrong"});
            }
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message: error.message});
    }
}
const getToDo = async(req,res) =>{
    try {
        const {_id,date} = req.body;
        const get = await Todo.findOne({user: _id,date});
        if(get){
            res.status(200).send({status: "Data found",data :get });
        }else{
            res.status(200).send({status: "Data not found"})
        }
    } catch (error) {
        res.status(400).send({message: "SomeThing Went Wrong"});
    }
}

const setContestData = async (req, res) => {
    try {
        const {contestData,date,_id} = req.body;
        
        const todoExist = await Todo.findOne({user: _id,date: date});
        if(todoExist){
            const listData = todoExist.todo;
            let isFound = {type: false,idx : 0};
            
            listData.map((e,idx)=>{
                if(e.todoType === 'contest'){
                    isFound.type = true;
                    isFound.idx=idx;
                    return;
                }
            })
            if(isFound.type){
                let duplicates = false;
                listData[isFound.idx]?.tasks?.map(e =>{
                    if(e.name == contestData.name){
                        duplicates= true;
                        return;
                    }
                })
                if(duplicates){
                    res.status(201).send({message: "Success"})
                    return;
                }
                
                listData[isFound.idx]?.tasks.push({...contestData});
            }else{
                listData.push({type:'contest',tasks: [{...contestData}]});
            }
            const upDatedData = await Todo.findOneAndUpdate({user: _id,date},{$set:{todo: listData}},{upsert: true,returnDocument: 'after',});
            console.log("Data ",upDatedData);
            if(upDatedData){
                res.status(201).json({
                    todoData: upDatedData.todo,
                    date: upDatedData.date,
                })
            }else{
                throw new Error(upDatedData)
            }
        }else{
            const listData = [];
            listData.push({todoType:'contest',tasks: [{...contestData}]});
            const _newToDo = new Todo({user:_id,todo:listData,date});
            const _data = await _newToDo.save();
            console.log("Data ",_data);
            if(_data){
                res.status(201).json({
                    todoData: _data.todo,
                    date: _data.date,
                })
            }else{
                throw new Error(_data)
            }
        }
    } catch (error){
        console.log(error);
        res.status(400).send({message: "SomeThing Went Wrong"});
    }
}


module.exports ={
    createToDo,
    getToDo,
    setContestData,
}
