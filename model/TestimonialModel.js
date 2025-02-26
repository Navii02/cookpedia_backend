const mongoose = require('mongoose')

const TestimonySchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
        
    },
    status:{
        type:String,
        require:true,
        default:'Pending' 
    }
}
)
const testimonials=mongoose.model('testimonials',TestimonySchema);
module.exports=testimonials