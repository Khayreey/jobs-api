const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'you must provide name'] , 
        minLength : 3 , 
        maxLength : 25
    } , 
    email : {
        type : String , 
        required : [true , 'you must provide email'] , 
        match : [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'please provide valid email'],
        unique : true
    } , 
    password : {
        type : String , 
        required : [true , 'you must provide password'] , 
        minLength : 6 , 
    } 
})
userModel.pre('save' , async function(){
    // hashing our password to save it as bits 
    // generate random bits for hashing
    const randomBits = await bcrypt.genSalt(10)
    // hashing our password with the salt we define
    this.password = await bcrypt.hash(this.password , randomBits)
})
userModel.methods.createJWT = function(){
    return jwt.sign({userId : this._id , name : this.name} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFETIME})
}
userModel.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass , this.password)
    return isMatch
}
module.exports = mongoose.model( "Users",userModel)