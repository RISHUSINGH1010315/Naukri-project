import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from "lucide-react";


export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: null
  });

  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200'>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
        <form onSubmit={handleSubmit} className='w-full md:w-1/2 border border-gray-200 rounded-2xl p-10 my-10 shadow-2xl bg-white backdrop-blur-md'>
          <h1 className='font-bold text-3xl mb-8 text-center text-[#432974]'>Create Your Account</h1>

          <div className='mb-5'>
            <Label htmlFor='fullname' className='mb-2 block text-gray-700'>Full Name</Label>
            <Input
              id='fullname'
              name='fullname'
              type='text'
              placeholder='Enter your full name'
              value={input.fullname}
              onChange={changeEventHandler}
              required
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974]'
            />
          </div>

          <div className='mb-5'>
            <Label htmlFor='email' className='mb-2 block text-gray-700'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              value={input.email}
              onChange={changeEventHandler}
              required
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974]'
            />
          </div>

          <div className='mb-5'>
            <Label htmlFor='phoneNumber' className='mb-2 block text-gray-700'>Phone Number</Label>
            <Input
              id='phoneNumber'
              name='phoneNumber'
              type='tel'
              placeholder='Enter your phone number'
              value={input.phoneNumber}
              onChange={changeEventHandler}
              required
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974]'
            />
          </div>

          <div className='mb-5'>
            <Label htmlFor='password' className='mb-2 block text-gray-700'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='**********'
              value={input.password}
              onChange={changeEventHandler}
              required
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974]'
            />
          </div>

          <div className='my-6'>
            <Label className='mb-2 block text-gray-700'>Select your role</Label>
            <RadioGroup className='flex gap-6'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor='student'>Student</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor='recruiter'>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className='flex items-center gap-2 mb-6'>
            <Label htmlFor='file'>Profile</Label>
            <Input
              id='file'
              type='file'
              accept='image/*'
              onChange={changeFileHandler}
              className='cursor-pointer'
            />
          </div>

          {
            loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#432974] to-[#5b30a6] text-white text-lg font-semibold hover:opacity-90 transition duration-300 shadow-md"
              >
                Create Account
              </Button>
            )
          }


          <p className='text-sm text-center text-gray-600 mt-6'>
            Already have an account? <Link to='/login' className='text-[#432974] underline hover:text-[#5b30a6] transition'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
