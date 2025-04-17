//user schema

import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['admin', 'user', 'recruiter', 'student'],
        required:true
    },
    applications: [{  // <-- Add this block
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},  //url for resume
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);