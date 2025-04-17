import { Job } from "../models/job.model.js";

// Admin: Post a new job
export const postJob = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const {
            title,
            description,
            requirements,
            Salary: salary, // 🔥 FIXED: Captures `Salary` from request and renames it to `salary`
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id;

        // Improved validation (0 is allowed for experience/position)
        if (
            !title?.trim() ||
            !description?.trim() ||
            !requirements?.trim() ||
            salary === undefined || salary === null ||
            !location?.trim() ||
            !jobType?.trim() ||
            experience === undefined || experience === null ||
            position === undefined || position === null ||
            !companyId?.trim()
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Create new job
        const job = await Job.create({
            title: title.trim(),
            description: description.trim(),
            requirements: requirements.split(",").map(req => req.trim()),
            salary: Number(salary),
            location: location.trim(),
            jobType: jobType.trim(),
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log("Error in postJob:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
// get all jobs for students
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch (error) {
        console.log(error);
    }
}

// get job by id for student
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({job, success:true});
    } catch (error) {
        console.log(error);
    }
}

// for admin 
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not Found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error){
        console.log(error);
    }
}
