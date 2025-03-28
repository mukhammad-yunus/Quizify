import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const QuizItem = ({ item, isFirst, isLast }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`flex text-sm justify-between cursor-pointer p-4 hover:bg-blue-50 
      ${isFirst ? "rounded-t-lg border-b border-b-neutral-300 " : ""} 
      ${isLast ? "rounded-b-lg" : "border-b border-b-neutral-300 "}`}
    >
      <div>
        <p className="text-neutral-500 font-semibold">{formattedDate}</p>
        <p className="text-lg font-bold">{item.title}</p>
        <p>{item.description}</p>
      </div>
      <div className="self-end">
        <p>{item.totalScore}</p>
        <p>{item.duration}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.log("Error occurred", err));
  }, []);

  return (
    <div className="m-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>Dashboard</h1>
        <Link to={"/create/quiz"}>
          <div className="flex">
            <p className="bg-blue-500 text-neutral-50 rounded py-0.5 px-3 transition hover:bg-blue-400 cursor-pointer">Create a quiz</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col border-neutral-400 border rounded-lg">
        {dashboard.hasData ? (
          dashboard.data.map((item, index) => (
            <Link to={"/quiz/" + item.id}>
              <QuizItem
                key={item.id}
                item={item}
                isFirst={index === 0}
                isLast={index === dashboard.data.length - 1}
              />
            </Link>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
