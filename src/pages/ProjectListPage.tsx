import React from "react";
import { Link } from "react-router-dom";

const ProjectListPage: React.FC = () => {
  const projects = Object.keys(localStorage);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
      <ul>
        {projects.map((projectName) => (
          <li key={projectName} className="mb-2">
            <Link
              to={`/projects/${projectName}`}
              className="text-blue-500 hover:underline"
            >
              {projectName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectListPage;
