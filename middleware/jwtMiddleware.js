const jwt=require('jsonwebtoken');
const jwtMiddleware=(req,res,next)=>{
    console.log("insider middleware");
    
    const token =req.headers['authorization'].split(" ")[1]
    if(token){
        try {
            const jwtResponse=jwt.verify(token,process.env.JWTPASSWORD)
            req.userId = jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json('Authorization failed ....please login')
            
        }
    }else{
        res.status(404).json('Authorization failed ')

    }
}
module.exports =jwtMiddleware