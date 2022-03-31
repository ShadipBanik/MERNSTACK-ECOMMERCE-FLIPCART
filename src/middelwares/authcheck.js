
const jwt = require("jsonwebtoken");
exports.authCheck = (req,res,next) =>{
    try{

        if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify
        next();
        }
        else{
            next("Unautorized")
        }
    } catch{
       next("Unautorized")
    }
    
}

exports.userMiddleware = (req,res,next) => {
    if(req.user.role !='user'){
        return res.status(400).json({message:"Access denied"})
    }
    next()
}

exports.adminMiddleware = (req,res,next) => {
    if(req.user.role !='admin'){
        return res.status(400).json({message:"Access denied"})
    }
    next()
}