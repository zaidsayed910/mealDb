import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
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
  return (
    <div>
      <ul>
        {arr.map((data) => (
          <div key={data.id}>
            <li>
              <Link to={`/courses/${data.id}`}>{data.course_name}</Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Product;
