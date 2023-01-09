const {AuthError , BadRequestError} = require('../errors/index')
const jwt = require('jsonwebtoken')
const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new BadRequestError('auth header error')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {userId : payload.userId , name : payload.name}
        next()
    }
    catch(err){
        throw new AuthError('invalid token')
    }
}

module.exports = auth