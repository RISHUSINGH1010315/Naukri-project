import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import store from '@/redux/store';


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5'>

                    {/* Filter Section */}
                    <div className='w-20%'>
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {jobsArray.length === 0 ? (
                            allJobs.length <= 0 ? (
                                <span className='text-gray-500'>Job not found</span>
                            ) : null
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {allJobs.map((job) => (
                                    <div key={job?._id}>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Jobs;
