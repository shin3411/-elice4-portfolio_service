import React from "react";

const Project = ({ isEditable, projectList, setProjectList }) => {
  console.log(projectList);
  return (
    <>
      {projectList.map((i) => {
        return (
          <div>
            <div>{i.title}</div>
            <div>{i.description}</div>
            <div>{i.from_date}</div>
            <div>{i.to_date}</div>
          </div>
        );
      })}
    </>
  );
};

export default Project;
