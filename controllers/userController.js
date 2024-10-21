const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

// async function registerUser(req, res){
//     newEmail = req.body.email ;
//     try {
//         const userExists = await User.findOne({email : newEmail});
//         if(userExists){
//             res.status(400).send({message : 'User already exists'})  
//         }else{
//             const user = new User(req.body);
//             console.log(req.body);
//             result = await user.save();
//             console.log(result)
//             res.status(200).send({message : 'Registration successful', task:result})
//         }
         
//     } catch (error) {
//         res.status(500).send(error); 
//     }
// }
async function registerUser(req, res){
    newEmail = req.body.email ;
    try {
        const userExists = await User.findOne({email : newEmail});
        if(userExists){
            res.status(200).send({message : 'User already exists'})
        }else{
            const user = await new User(req.body);
            const result = await user.save();
            res.status(200).send({message : 'registration successful',task: result})
        } 
        
    } catch (error) {
        res.status(500).send(error);
    }
}
 
async function loginUser (req, res){
    try {
        newEmail = req.body.email;
        newPassword = req.body.password;
        const user = await User.findOne({email:newEmail});
        console.log(user);
        if(!user){
            res.status(400).send({ error: 'Invalid login credentials'});
        }
        isMatch = await user.comparePassword(newPassword);
        if(!isMatch){
            return res.status(400).send({error : 'Password Incorrect'})
        }
        const token = jwt.sign({_id : user._id},'prajwal',{expiresIn :'1h'});
        res.status(200).send({accessToken : token});

    } catch (error) { 
        res.status(500).send(error);
    }
}

module.exports = {   
    registerUser ,
    loginUser
}  