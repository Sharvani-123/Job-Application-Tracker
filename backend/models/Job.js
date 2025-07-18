const mongoose= require('mongoose');
const jobSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },

    company: {
        type:String,
        required:[true, 'Please add a company name'],
        trim: true
    },
    role:{
        type:String,
        required:[true, 'Please add a job role'],
        trim: true
    },
    status:{
        type:String,
        required: true,
        enum:['applied', 'interview','offer','rejected'],
        default: 'applied'
    },
    appliedDate:{
        type:Date,
        default: Date.now
    },
    interviewDate:{
        type:Date,
    },
    notes:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});

module.exports=  mongoose.model('Job',jobSchema);