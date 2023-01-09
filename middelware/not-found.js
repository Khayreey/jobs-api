const notFoundMiddelware = (req,res)=> res.status(404).json({msg : 'Not Found route'})

module.exports = notFoundMiddelware