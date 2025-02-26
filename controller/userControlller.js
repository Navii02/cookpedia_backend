const users =require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

exports.AddUserController= async(req,res)=>{
const {username,email,password} = req.body

try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json('User already exists')
    }
    else{
        const encryptedPassword = await bcrypt.hash(password,10)
        const newuser = new users({
            username,email,password:encryptedPassword,profilePic:""
        })
        await newuser.save()
        res.status(200).json(newuser)
    }

}catch(e){
    res.status(400).json(error)
}

}
exports.loginController=async(req,res) => {
    const {email,password} = req.body
    //console.log(req.body);
    
    try{
        const existingUser= await users.findOne({email})
        if(existingUser){
            let ispasswordMatch=await bcrypt.compare(password,existingUser.password)
            if(ispasswordMatch || password==existingUser.password){
                const token= jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingUser, token})
            }else{
                res.status(404).json('invalid email/password')
            }
        }else{
            res.status(404).json('invalid email/password')

        }
    }catch(e){
        res.status(401).json(e)
    }
}

exports.userupdatecontroller = async(req,res)=>{
    const {profilePic}= req.body
    const userId= req.userId
    try {
     const existingUser = await users.findById({_id: userId})   
     existingUser.profilePic = profilePic
     await existingUser.save()
     res.status(200).json(existingUser)
    } catch (error) {
      res.status(401).json(error)  
    }
}
exports.getAlluserController = async(req,res) => {
    try{
        const allusers = await users.find({role:"User"})
        res.status(200).json(allusers)
    }catch(error){
        res.status(401).json(error)
    }
}