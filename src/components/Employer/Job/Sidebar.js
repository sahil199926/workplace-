import React from 'react'
import Sidebarcard from './Sidebarcard'

const mockData = [
  {
    createdAt: "2-feb",
    jobTitle: "Frontend Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "12nu3456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "backend Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "12un3456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "Fullstack Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "123onun456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "Frontend Developer-2",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "1234iu56",
  },
  {
    createdAt: "2-feb",
    jobTitle: "SDE-1",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "123ouij456",
  }
]
function Sidebar({postAjob,selectThisJob,selectedJob}) {
  return (
    <div>
      <button
      
      onClick={postAjob}
      >Post a Job</button>
      {
        mockData.map((item, index) => {
          return <Sidebarcard key={index} item={item} selectThisJob={selectThisJob} selectedJob={selectedJob} />
        })
      }
    </div>
  )
}

export default Sidebar