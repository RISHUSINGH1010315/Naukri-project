import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // For error messages

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(null); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    if (!input.email || !input.password) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      console.log("Sending:", input);
      const res = await axios.post(`${USER_API_END_POINT}/login`, 
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccess(true);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || error.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200'>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
        <form onSubmit={handleSubmit} className='w-full md:w-1/2 border border-gray-200 rounded-2xl p-10 my-10 shadow-2xl bg-white backdrop-blur-md'>
          <h1 className='font-bold text-3xl mb-8 text-center text-[#432974]'>Welcome To Naukri<span className='text-[#F83002]'>Portal</span></h1>

          {/* Email */}
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
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974] transition duration-300'
            />
          </div>

          {/* Password */}
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
              className='rounded-xl px-4 py-2 border-gray-300 focus:ring-2 focus:ring-[#432974] transition duration-300'
            />
          </div>

          {/* Role Selection */}
          <div className='my-6'>
            <Label className='mb-2 block text-gray-700'>Select your role</Label>
            <RadioGroup className='flex gap-6'>
              <div className="flex items-center space-x-2">
                <Input
                  id="role-student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor='role-student'>Student</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  id="role-recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor='role-recruiter'>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Loading Button */}
          {
            loading ? 
              <Button className="w-full my-4">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
              </Button>
              : 
              <Button type='submit' className='w-full py-3 rounded-xl bg-gradient-to-r from-[#432974] to-[#5b30a6] text-white text-lg font-semibold hover:opacity-90 transition duration-300 shadow-md'>
                Login
              </Button>
          }

          {/* Success or Error Message */}
          {success && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center shadow transition-all duration-300">
              ✅ Login successful!
            </div>
          )}
          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center shadow transition-all duration-300">
              ❌ {error}
            </div>
          )}

          <p className='text-sm text-center text-gray-600 mt-6'>
            Don't have an account? <Link to='/signup' className='text-[#432974] underline hover:text-[#5b30a6] transition'>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
