import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const randomJobs = [1, 2, 3, 4, 5, 6,]

const Browser = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Centered Search Bar */}
                <div className="flex justify-center">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search for jobs, roles, companies..."
                            className="w-full sm:w-96 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-purple-700 transition duration-300">
                            Search
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">
                    Search Results <span className="text-purple-600">({randomJobs.length})</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        randomJobs.map((item, index) => (
                            <div
                                key={index}
                                className="transition-transform duration-300 hover:-translate-y-1"
                            >
                                <Job />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browser
