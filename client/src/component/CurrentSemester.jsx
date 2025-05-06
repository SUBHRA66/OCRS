import React, { useState } from "react";
import { useSelector } from "react-redux";

export const CurrentSemester = () => {
  const course = useSelector((state) => state.course);
  console.log(course);
  if (!course || course.length === 0) {
    return (
      <div className="no-courses">
        You have not selected any course for this semester yet.
      </div>
    );
  } else {
    return (
      <div className="courses-container">
        {course.map((item, index) => (
          <div key={index} className="course-item">
            <div className="cname">{item.cname}</div>
            <div className="ccode">{item.ccode}</div>
            <div className="ccredit">Course Credit {item.ccredit}</div>
          </div>
        ))}
      </div>
    );
  }
};


export const loginPage = () =>{


  //hooks
  const [count, setcount] = useState(0)


  return (
    <div className="login">LOGIN PAGE</div>
    
  )
}