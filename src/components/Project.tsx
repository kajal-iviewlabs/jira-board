import React from "react";
import "./project.css";

const Project = () => {
  return (
    <>
      <div className="project-dropDown-container">
        <div className="project-task">RECENT</div>
        <div>Project List</div>
        <div className="project-block" role="group">
          <span>
            <a className="projects-link" href="/jira/projects" target="_self">
              <span className="project-dropdown-text">View all projects</span>
            </a>
            <button className="projects-link">
              <span className="project-dropdown-text">Create project</span>
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Project;
