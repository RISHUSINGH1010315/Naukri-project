import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-hot-toast";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [form, setForm] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        skills: user?.profile?.skills?.join(", ") || "",
        bio: user?.profile?.bio || "",
        resume: user?.profile?.resume || null,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setForm(prev => ({ ...prev, resume: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append("fullname", form.name);
        formData.append("email", form.email);
        formData.append("phoneNumber", form.phone);
        formData.append("bio", form.bio);
        formData.append("skills", form.skills);

        if (form.resume) {
            formData.append("file", form.resume); // ✅ Correct field name for multer
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success("Profile updated successfully!");
            }

            setOpen(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        You can update your contact information, skills, and upload your resume.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="skills" className="text-right pt-2">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={form.skills}
                                onChange={changeEventHandler}
                                placeholder="e.g. React, Node.js, Python"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={changeEventHandler}
                                rows={4}
                                placeholder="A short paragraph about you..."
                                className="col-span-3 w-full rounded-md border px-3 py-2 text-sm shadow-sm resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume" className="text-right">Resume</Label>
                            <Input
                                id="resume"
                                name="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button disabled className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#432974] to-[#5b30a6] text-white text-lg font-semibold hover:opacity-90 transition duration-300 shadow-md"
                            >
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
