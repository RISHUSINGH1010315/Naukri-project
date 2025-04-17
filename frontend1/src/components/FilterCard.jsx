import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "4lakh-10lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Filter Jobs</h1>
      <hr className="mb-6 border-gray-300" />
      <RadioGroup className="space-y-6">
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-black mb-2">{data.filterType}</h2>
              <div className="space-y-2">
                {
                  data.array.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={`${data.filterType}-${i}`} />
                      <Label htmlFor={`${data.filterType}-${i}`} className="text-black cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
