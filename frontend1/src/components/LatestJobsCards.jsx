import React from 'react';
import { Badge } from './ui/badge';

const LatestJobsCards = ({ job }) => {
  return (
    <div className='bg-white shadow-md rounded-xl p-6 space-y-4 hover:shadow-lg transition-all duration-300'>
      
      {/* Header */}
      <div>
        <h1 className='text-xl font-semibold text-[#6A38C2]'>
          {job?.company?.name || 'Company Name'}
        </h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>

      {/* Title + Description */}
      <div>
        <h3 className='text-lg font-medium'>{job?.title || 'Job Title'}</h3>
        <p className='text-gray-600 text-sm mt-1'>
          {job?.description || 'Job description not available.'}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-2 mb-4'>
        {job?.position && (
          <Badge className='text-blue-700 font-bold hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200' variant="ghost">
            {job.position} Positions
          </Badge>
        )}
        {job?.jobType && (
          <Badge className='text-[#F83002] font-bold hover:bg-red-100 hover:text-red-800 transition-colors duration-200' variant="ghost">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className='text-[#7209b7] font-bold hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200' variant="ghost">
            {job.salary} LPA
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LatestJobsCards;
