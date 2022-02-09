const express = require('express');
const router = express.Router();
const {signUp,signIn} = require('../controller/userController');

router.post('/user/signup/',signUp);
router.post('/user/signin/',signIn);

module.exports = router;