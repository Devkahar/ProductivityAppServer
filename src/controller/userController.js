const User = require('../model/userModel');
const {validateEmail,validatePassword,generateToken} = require('../helper/authHelper');
// @desc    Register a new user
// @route   POST /api/user/signup
// @access  Public
const signUp = async (req,res)=>{
    // console.log(req);
    const {firstName,lastName,password,email} = req.body;
    if(validateEmail(email)&&validatePassword(password)&&firstName!==""&&lastName!==""){
        try {
            const emailExisit = await User.findOne({email: email});
            if(emailExisit){
                errorMeassge = "User Already Exist";
                res.status(401).json({errorMeassge});
            }else{
                // Create New User;
                const name = firstName+" "+lastName;
                const user = new User({email,name,password});
                const userCreated = await user.save();
                if(userCreated){
                    const data = {
                        name: userCreated.name,
                        email: userCreated.email,
                        token: generateToken(userCreated._id),
                    }
                    res.status(201).json({...data});
                }
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({errorMeassge: error.message});
        }
    }else{
        const errorMeassge = "Invalid Login Details";
        res.status(401).json({errorMeassge});
    }
}

const signIn = async (req, res) => {
    const {email,password} = req.body;
    if(email && password){
        try {
            const user = await User.findOne({email});
            if(user && await user.matchPassword(password)){
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            }else{
                errorMeassge = "Enter Valid Login Details 3";
                res.status(401).json({errorMeassge});
            }
        } catch (error) {
            res.status(401).json({errorMeassge: error.message});
        }
    }else{
        errorMeassge = "Enter Valid Login Details";
        res.status(401).json({errorMeassge});
    }
}

const authGoogle = async (req,res)=>{
    const {email,name} = req.body.profileObj;
    try {
        const _user = await User.findOne({email});
        if(_user){
            const data = {
                name: _user.name,
                email: _user.email,
                token: generateToken(_user._id),
            }
            res.status(201).json({...data});
        }else{
            const userCreated = await User.create({email,name,password: ""});
            if(userCreated){
                const data = {
                    name: userCreated.name,
                    email: userCreated.email,
                    token: generateToken(userCreated._id),
                }
                res.status(201).json({...data});
            }
        }
    } catch (error) {
        res.status(401).json({errorMeassge: "Something Went Wrong"});
    }
}


module.exports ={
    signUp,signIn,authGoogle,
}