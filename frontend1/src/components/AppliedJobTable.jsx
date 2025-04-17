import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  const jobs = [
    { date: '12-04-2025', role: 'Frontend Developer', company: 'Google', status: 'Selected' },
    { date: '10-04-2025', role: 'UI Designer', company: 'Meta', status: 'Pending' },
  ]

  // ✅ Removed TypeScript annotation for status (JSX fix)
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'selected':
        return <Badge className="bg-green-100 text-green-700">{status}</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h2>
      <Table>
        <TableCaption className="text-sm text-gray-500 mb-2">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-medium text-gray-700">Date</TableHead>
            <TableHead className="font-medium text-gray-700">Job Role</TableHead>
            <TableHead className="font-medium text-gray-700">Company</TableHead>
            <TableHead className="text-right font-medium text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            jobs.map((job, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition">
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell className="text-right">{getStatusBadge(job.status)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
