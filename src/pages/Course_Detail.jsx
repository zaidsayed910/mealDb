import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const Course_detail = () => {
  const arr = [
    {
      id: "MERN001",
      course_name: "MERN_Stack",
      price: 10000,
      duration: "5 Months",
    },
    {
      id: "JAVA002",
      course_name: "JAVA_Fullstack",
      price: 15000,
      duration: "5 Months",
    },
    {
      id: "Python010",
      course_name: "PYTHON_Fullstack",
      price: 5000,
      duration: "5 Months",
    },
    {
      id: "React99",
      course_name: "React.JS",
      price: 25000,
      duration: "5 Months",
    },
  ];

  const { id } = useParams();
  const location = useLocation();

  const course_detail = arr.filter((data) => data.id == id);
  console.log(course_detail);
  return (
    <>
      <div>
        <h1>Course id:- {id}</h1>
        <h2>Course Name:- {course_detail[0].course_name}</h2>
        {location.pathname !== "/courses/Python010" && (
          <>
            <h2>Course Duration:- {course_detail[0].duration}</h2>
            <h2>Course Price:- {course_detail[0].price}</h2>
          </>
        )}
      </div>
      <button>
        <Link
          to={"/courses"}
          style={{ textDecoration: "none", color: "black" }}
        >
          All Courses
        </Link>
      </button>
    </>
  );
};

export default Course_detail;
