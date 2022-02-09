const express = require('express');
const router = express.Router();
const {signUp,signIn,authGoogle} = require('../controller/userController');

router.post('/user/signup/',signUp);
router.post('/user/signin/',signIn);
router.post('/user/googleauth/',authGoogle);
module.exports = router;

