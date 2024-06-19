import AddResume from "@/components/AddResume";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-10 md:px-20 lg:px-30">
      <h2 className="text-3xl font-bold">My Resumes</h2>
      <p>Start creating Resume with AI for your next job.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />
      </div>
    </div>
  );
};

export default Dashboard;
