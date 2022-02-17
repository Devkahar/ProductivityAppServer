const jwt = require('jsonwebtoken');
const signInRequired = (req,res,next)=>{
    console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
        const token = req.headers.authorization.split(' ')[1];
        console.log("token ",token);
        jwt.verify(token,process.env.JWT_SECRET,(err, user) => {
            if(err){
                const sigoutRequired = true;
                res.status(401).json({sigoutRequired});
            }else{
                req.body._id = user.id;
                next();
            }
        });
    }
    else{
        return res.status(500).json({
            message: "Auth required"
        })
    }
}

module.exports ={
    signInRequired,
}

// const googleToken = async (req,res,next)=>{
    
//     const CLIENT_ID = process.env.CLIENT_ID;
//     const client = new OAuth2Client(CLIENT_ID);
//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//             // Or, if multiple clients access the backend:
//             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//         });
        
//         const payload = ticket.getPayload();
//         const userid = payload['sub'];
//         // console.log("Auth Payload Data");
//         // console.log(payload);
//         if(userid){
//             next();
//         }else {
//             const sigoutRequired = true;
//             res.status(401).json({sigoutRequired});
//         }
//         // If request specified a G Suite domain:
//         // const domain = payload['hd'];
//         // verify().catch(console.error);
//     } catch (error) {
//         res.status(401).json({errorMeassge: error.message});
//     }
    
// }