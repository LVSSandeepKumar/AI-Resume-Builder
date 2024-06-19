import AddResume from "@/components/AddResume";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "@/components/ResumeCardItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress.emailAddress)
    .then(
      (res) => {
        setResumeList(res.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-30">
      <h2 className="text-3xl font-bold">My Resumes</h2>
      <p>Start creating Resume with AI for your next job.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {
          resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
