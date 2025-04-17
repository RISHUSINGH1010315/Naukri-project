import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { LogOut, User } from "lucide-react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
  const { user } = useSelector(store => store.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }


  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            Naukri<span className='text-[#F83002]'>Portal</span>
          </h1>
        </div>

        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browser">Browser</Link></li>
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#7b40e8] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-blue-500 transition-transform hover:scale-105">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-4 rounded-xl shadow-xl border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="text-base font-semibold">Hello, {user?.fullname}</h4>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior if needed
                      logoutHandler(); // Trigger logout logic
                    }}
                    className="w-full justify-start gap-2 text-sm hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
