const jwt = require('jsonwebtoken');
const User = require('../models/user');


//to decrypt the token
exports.authenticate = async (req,res,next)=>{
    try{
        const token = req.header('authorization');
        const userObject = jwt.verify(token,"seiuhn3o4it8y34953n4v5o345");
        const user = await User.findByPk(userObject.userId);
        if(user){
            req.user = userObject;
            next();
        }
    }catch(err){
        console.log('>>>>>>>>>>>>in catch block of auth.js because we didnt get the user from userObject.userId');
        return res.status(500).json({error:"something wrong in authenticating"});
    }
};