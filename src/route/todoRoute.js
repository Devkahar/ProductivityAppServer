const express = require('express');
const { houseModel } = require('../controller/modelController');
const router = express.Router();
const {createToDo,getToDo,setContestData} = require('../controller/todoController');
const { signInRequired} = require('../middleware/authMiddleware');

router.post('/todo/create/',signInRequired,createToDo);
router.post('/todo/get/',signInRequired,getToDo);
router.post('/todo/create/contest',signInRequired,setContestData);

router.get('/getModel/housePrice',houseModel);
module.exports = router;