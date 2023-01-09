const mongoose = require('mongoose')

const jobModel = new mongoose.Schema({
    company : {
        type :String , 
        required : [true , 'you must provide a company name'],
        maxLength : 50 ,
    } ,
    position : {
        type :String , 
        required : [true , 'you must provide a position'],
        maxLength : 100 ,
    } ,
    status : {
        type : String , 
        enum : ['interview' , 'declined' , 'pending'] ,
        default : 'pending'
    } ,
    createdBy : {
        type :mongoose.Types.ObjectId , 
        ref : 'Users' , 
        required : [true , 'you must provide user'],  
    }
} , {timestamps : true})


module.exports = mongoose.model( "Jobs",jobModel)