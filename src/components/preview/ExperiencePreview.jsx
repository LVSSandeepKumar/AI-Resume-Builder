import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold"
          style={{
            color : resumeInfo?.themeColor
          }}
          >{experience?.title}</h2>
          <h2 className="flex justify-between text-xs">
            {experience?.companyName},{experience?.city},{experience?.state}
            <span>
              {experience?.startDate} to{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <div className="text-xs" dangerouslySetInnerHTML={{__html : experience?.workSummary}} />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
