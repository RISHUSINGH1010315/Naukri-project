import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateprofileDialog from './UpdateprofileDialog'
import store from '@/redux/store'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const resumeIcon = user?.profile?.resumeOriginalName?.endsWith(".pdf")
        ? <FileText className="w-4 h-4 mr-1 text-red-500" />
        : <FileText className="w-4 h-4 mr-1 text-gray-600" />;

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

                {/* Header: Avatar + Name + Edit */}
                <div className='flex justify-between'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://logo.clearbit.com/openai.com" alt="Profile" />
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio}</p>
                            {
                                user?.profile?.updatedAt && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Last updated: {new Date(user.profile.updatedAt).toLocaleDateString()}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline">
                        <Pen className="w-4 h-4 mr-2" /> Edit
                    </Button>
                </div>

                {/* Contact Info */}
                <section className='my-6 space-y-2'>
                    <div className='flex items-center gap-3 text-gray-700'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-700'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </section>

                {/* Skills */}
                <section className='my-6'>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {
                            user?.profile?.skills && user.profile.skills.length !== 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge key={index} className="text-sm">{item}</Badge>
                                ))
                            ) : (
                                <span className="text-gray-500">NA</span>
                            )
                        }
                    </div>
                </section>

                {/* Resume */}
                <section className='my-6 max-w-sm'>
                    <Label className="text-md font-semibold text-gray-800 mb-1 block">Resume</Label>
                    {
                        user?.profile?.resume
                            ? (
                                <a
                                    href={user?.profile?.resume}
                                    download={user?.profile?.resumeOriginalName || "resume"}
                                    className="inline-flex items-center text-blue-600 hover:underline"
                                >
                                    {resumeIcon}
                                    {user?.profile?.resumeOriginalName || 'View Resume'}
                                </a>
                            ) : (
                                <span className="text-gray-500">NA</span>
                            )
                    }
                </section>
            </div>

            {/* Applied Jobs */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <AppliedJobTable />
            </div>

            {/* Edit Dialog */}
            <UpdateprofileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
