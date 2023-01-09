const jobsModel = require('../models/jobModel')
const {StatusCodes} = require('http-status-codes')
const jobModel = require('../models/jobModel')
const  {NotFoundError,BadRequestError} = require('../errors/index')

const getAllJobs = async (req,res)=>{
    const jobs = await jobModel.find({createdBy : req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs , count : jobs.length})
}
const getJobById = async (req,res)=>{
   const {user : {userId} , params : {id : jobId}} = req
   const job = await jobModel.find({
    _id : jobId , createdBy : userId
   })
   if(job.length === 0){
        throw new NotFoundError(`No Job Found With This Id "${jobId}"`)
   }

   res.status(StatusCodes.OK).json({job})
}
const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res)=>{
    const {user : {userId} , params : {id : jobId} , body : {company , position} } = req
    if(!company && !position){
        throw new BadRequestError('you must provide the thing that you want update')
    }
    const job = await jobModel.findOneAndUpdate({
     _id : jobId , createdBy : userId} , req.body , {new : true , runValidators : true})
    if(!job){
         throw new NotFoundError(`No Job Found With This Id "${jobId}"`)
    }
 
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req,res)=>{
    const {
        user: { userId },
        params: { id: jobId },
      } = req
    
      const job = await jobModel.findOneAndRemove({
        _id: jobId,
        createdBy: userId,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
      res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs ,
    getJobById ,
    createJob , 
    updateJob , 
    deleteJob
}