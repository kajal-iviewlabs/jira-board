import React from "react";
import { Link } from "react-router-dom";

const ProjectListPage: React.FC = () => {
  const projects = Object.keys(localStorage);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">All Projects</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((projectName) => {
            const projectDetails = JSON.parse(
              localStorage.getItem(projectName) || ""
            );
            return (
              <div
                key={projectName}
                className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition duration-300"
              >
                <Link
                  to={`/project/${projectName}`} // Navigate to the project page
                  className="text-blue-900 hover:underline"
                >
                  <h2 className="text-xl font-semibold mb-2">{projectName}</h2>
                </Link>
                <p className="overflow-hidden overflow-ellipsis">
                  {projectDetails.projectDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
