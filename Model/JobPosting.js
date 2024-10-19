const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostingSchema = new Schema({
    companyId: {
        type: String,
        ref: 'Company',
        required: true, 
    },
    jobId:{
        type:Number,
        unique:true,
        required:true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Fresher', 'Junior', 'Mid', 'Senior', 'Lead', 'Manager'], 
    },
    endDate: {
        type: Date,
        required: true,
    },
    candidates: [
        {
            email: {
                type: String,
                required: true,
                match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
            }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
