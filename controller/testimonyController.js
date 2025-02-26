const testimonials = require('../model/TestimonialModel')

exports.addTestimonyController=async(req, res) => {
    const {name,email,message} = req.body
    console.log(req.body);
    
    try{
        const newtestimony =new testimonials({
            name,email,message
        })
        await newtestimony.save()
        res.status(200).json(newtestimony)
    }catch(error){
        res.status(401).json(error)
    }

}

exports.getAllApprovedFeedBackController =async(req,res) => {
    try{
        allApprovedFeedbacks =await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    }catch(error){
        res.status(401).json(error)
    }
}
exports.getAllFeedbackController = async (req,res)=>{
    console.log("inside getAllFeedbackController");
    try{
        allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
}
exports.updateFeedbackStatusContoller = async (req,res)=>{
    console.log("Inside updateFeedbackStatusContoller");
    // get feedback id from url parameter
    const {id} = req.params
    // get status of feedback from url  query
    const status = req.query.status
    // update status of feeback with given id
    try{
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }catch(err){
        res.status(401).json(err)
    }
}

