import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-lg relative cursor-pointer">
      {/* Bookmark + Posted Time */}
      <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
        <span>2 days ago</span>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600 hover:bg-gray-100">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Logo + Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo || "https://logo.clearbit.com/openai.com"} alt="Company logo" />
        </Avatar>
        <div>
          <h2 className="font-semibold text-base">{job?.company?.name || "Company Name"}</h2>
          <p className="text-sm text-gray-500">{job?.location || "India"}</p>
        </div>
      </div>

      {/* Job Title & Info */}
      <h3 className="text-lg font-bold mb-2 text-[#6A38C2]">{job?.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{job?.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.position && (
          <Badge className="text-blue-700 font-bold hover:bg-blue-100 hover:text-blue-900" variant="ghost">
            {job.position} Positions
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="text-[#F83002] font-bold hover:bg-red-100 hover:text-red-800" variant="ghost">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="text-[#7209b7] font-bold hover:bg-purple-100 hover:text-purple-800" variant="ghost">
            {job.salary} LPA
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} className="flex-1 bg-[#6A38C2] text-white hover:bg-[#4f2595]">
          View Details
        </Button>
        <Button variant="outline" className="flex-1 border-[#6A38C2] text-[#6A38C2] hover:bg-[#f2ebff]">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
