const express = require('express');
const router = express.Router();
const {createToDo} = require('../controller/todoController');
const { signInRequired} = require('../middleware/authMiddleware')
router.post('/todo/create/',signInRequired,createToDo);
module.exports = router;