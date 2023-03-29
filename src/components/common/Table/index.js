import moment from "moment";
import React from "react";
import './table.css'
function Table({ columns, data,actionFun }) {
  return (
    <div>
      <div className="column-head">
        {columns.map((column, index) => {
          return (
            <div style={column.style} key={index}>
              {column.heading}
            </div>
          );
        })}
      </div>

      <div>
        {data.map((row, index) => {
          return (
            <div
              style={{
                display: "flex",

                fontWeight: "500",
                fontSize: "clamp(10px 1vw, 16px)",
                lineHeight: "19px",
                borderRadius: "20px",
                background: "#d4d4d43b",
                padding: "20px 0px",
                margin: "10px 0px",
              }}
            >
              {columns.map((column, index) => {
                if (column.type === "date") {
                  return (
                    <div style={column.style} key={index}>
                      {moment(row[column.key].toDate().toString()).format(
                        "MMM Do YY"
                      )}
                    </div>
                  );
                }
               else if (column.type === "resume") {
                  return (
                    <div style={column.style} key={index}>
                      <a
                      href={row[column.key]}
                      target="_blank"
                      rel="noreferrer"
                      
                      >
                        resume
                      </a>
                    </div>
                  );
                }
                else if (column.type === "action") {
                  return (
                    <div style={column.style} key={index}>
                      <button
                      disabled={row.status==='accepted'}
                      style={{
                        opacity:row.status==='accepted'?0.5:1
                      }}
                      onClick={()=>actionFun(row,'accept')}
                      className="accept-btn"
                      >Accept</button>
                      <button
                       style={{
                        opacity:row.status==='accepted'?0.5:1
                      }}
                        disabled={row.status==='accepted'}
                      onClick={()=>actionFun(row,'reject')}
                      className="reject-btn"
                      >Reject</button>
                    </div>
                  );
                }
                else {
                  return (
                    <div style={column.style} key={index}>
                      {row[column.key]}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
