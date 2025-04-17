import React from 'react';
import { Button } from '../components/ui/button';

const HeroSection = () => {
    return (
        <section className='pt-24 px-4 animate-fadeIn'>
            <div className='flex flex-col items-center text-center max-w-2xl mx-auto'>
                <h1 className='text-5xl font-bold mt-4 leading-tight'>
                    Search, Apply & <span className="block">Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></span>
                </h1>
                <p className='mt-2 text-gray-600 text-lg'>
                    Discover thousands of opportunities tailored just for you. Take the next step in your career with confidence.
                </p>

                <div className="shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-full px-2 py-1 transition-all duration-300 w-full max-w-xl">
                    <form className="flex items-center gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Find Your Dream Jobs"
                            className="flex-1 outline-none border border-transparent rounded-full py-2 px-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6A38C2] transition-all duration-300"
                        />
                        <Button
                            type="submit"
                            className="bg-[#6A38C2] hover:bg-[#2d1b50] text-white px-5 py-2 rounded-full text-base transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Search
                        </Button>
                    </form>
                </div>



            </div>
        </section>
    );
};

export default HeroSection;
