import React from 'react'
import './job.css'
import moment from 'moment'
function Sidebarcard({item,selectThisJob,selectedJob}) {
  return (
    <div
    className={`sidebar-card ${selectedJob?.jobId===item.jobId && " sidebar-card-selected"}`}
    onClick={()=>selectThisJob(item)}
    >
      <h6>
       {
        moment(item.createdAt.toDate().toString()).format("MMM Do YY")
          
       }
      </h6>
      <h1>{item.jobTitle}</h1>
      <h4>{item.jopType}</h4>
      <h4>{item.jobLocation}</h4>
    </div>
  )
}

export default Sidebarcard