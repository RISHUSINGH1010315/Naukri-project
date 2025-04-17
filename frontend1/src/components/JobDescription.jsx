import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';

const JobDescription = () => {
    const [isApplied, setIsApplied] = useState(false);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const singleJob = useSelector(state => state.job.singleJob);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    console.log("Job Data:", res.data.jobs); // ✅ For debugging
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title || 'Job Title'}</h1>
                    <div className='flex items-center gap-2 mt-4 flex-wrap'>
                        <Badge className='text-blue-700 font-bold text-sm px-3 py-1 hover:bg-blue-100 hover:text-blue-900' variant="ghost">
                            {singleJob?.position || '0'} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold text-sm px-3 py-1 hover:bg-red-100 hover:text-red-800' variant="ghost">
                            {singleJob?.jobType || 'Job Type'}
                        </Badge>
                        <Badge className='text-[#011e33] font-bold text-sm px-3 py-1 hover:bg-gray-100 hover:text-black' variant="ghost">
                            Full Time
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold text-sm px-3 py-1 hover:bg-purple-100 hover:text-purple-800' variant="ghost">
                            {singleJob?.salary || 'N/A'} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#2d203a]'} text-white`}
                    disabled={isApplied}
                    onClick={() => {
                        if (!isApplied) setIsApplied(true);
                    }}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Details */}
            <h2 className='border-b-2 border-b-gray-300 font-semibold text-lg py-4 mt-6'>Job Description</h2>

            <div className='space-y-2 mt-4'>
                <p><span className='font-bold'>Role:</span> <span className='text-gray-800'>{singleJob?.title || 'N/A'}</span></p>
                <p><span className='font-bold'>Experience:</span> <span className='text-gray-800'>{singleJob?.experience || 'N/A'} yrs</span></p>
                <p><span className='font-bold'>Location:</span> <span className='text-gray-800'>{singleJob?.location || 'N/A'}</span></p>
                <p><span className='font-bold'>Salary:</span> <span className='text-gray-800'>{singleJob?.salary || 'N/A'} LPA</span></p>
                <p><span className='font-bold'>Job Type:</span> <span className='text-gray-800'>{singleJob?.jobType || 'N/A'}</span></p>
                <p><span className='font-bold'>Skills Required:</span> <span className='text-gray-800'>{singleJob?.description || 'N/A'}</span></p>
                <p><span className='font-bold'>About the Company:</span> <span className='text-gray-800'>{singleJob?.aboutTheCompany?.length || 'N/A'}</span></p>
            </div>
        </div>
    );
};

export default JobDescription;
