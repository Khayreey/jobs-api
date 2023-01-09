const express = require('express')
const router = express.Router()
const  {
    getAllJobs ,
    getJobById ,
    createJob , 
    updateJob , 
    deleteJob
} = require('../controllers/jobsController')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').delete(deleteJob).get(getJobById).patch(updateJob)


module.exports = router