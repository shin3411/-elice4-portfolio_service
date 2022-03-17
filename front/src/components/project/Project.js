import React from "react";
import ProjectCard from "./ProjectCard";

// project 목록을 담는 컴포넌트
const Project = ({ isEditable, projectList, setProjectList }) => {
  console.log(projectList);
  return (
    <>
      {projectList.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isEditable={isEditable}
          setProjectList={setProjectList}
        />
      ))}
    </>
  );
};

export default Project;
