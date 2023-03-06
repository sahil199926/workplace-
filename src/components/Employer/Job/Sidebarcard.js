import React from 'react'
import './job.css'
function Sidebarcard({item,selectThisJob,selectedJob}) {
  return (
    <div
    className={`sidebar-card ${selectedJob?.jobId===item.jobId && " sidebar-card-selected"}`}
    onClick={()=>selectThisJob(item)}
    >
      <h6>{item.createdAt}</h6>
      <h1>{item.jobTitle}</h1>
      <h4>{item.jobType}</h4>
      <h4>{item.jobLocation}</h4>
    </div>
  )
}

export default Sidebarcard