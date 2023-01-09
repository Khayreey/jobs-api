const UserModel = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError , AuthError} = require('../errors/index') 


const register = async (req,res)=>{
   
    const user = await UserModel.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user : {name : user.name}  , token })

}

const login = async (req,res)=>{
    const {email , password} = req.body
   
    const user = await UserModel.findOne({email})
    if(!user){
        throw new NotFoundError('this email dosent exist try register')
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new AuthError('Wrong password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user : {name : user.name} , token})
}

module.exports = {register , login}