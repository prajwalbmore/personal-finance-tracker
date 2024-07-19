const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String}
});

//hash
userSchema.pre('save',async function(next){
    const user = this;
    if (user.isModified('password')){
        console.log("*****") 
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("user",userSchema);
module.exports = User;

// {
//     "name" : "",
//     "number" : ,
//     "password" : ""
// }