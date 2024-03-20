import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa"; // Import task icon
import { BsPerson } from "react-icons/bs"; // Import person icon

const ProjectListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const projects = Object.keys(localStorage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center border-b border-gray-200 pb-2">
          All Projects
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search project..."
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((projectName) =>
              projectName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((projectName) => {
              try {
                const projectDetails = JSON.parse(
                  localStorage.getItem(projectName) || ""
                );

                return (
                  <div
                    key={projectName}
                    className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition duration-300 h-50 overflow-hidden"
                  >
                    <Link
                      to={`/project/${projectName}`}
                      className="text-blue-900 hover:underline flex items-center mb-2"
                    >
                      <FaTasks className="mr-2" />
                      <h2 className="text-xl font-semibold truncate">
                        {projectName}
                      </h2>
                    </Link>
                    <p className="overflow-hidden line-clamp-3 mb-2 h-16">
                      {projectDetails.projectDescription}
                    </p>
                    <div className="flex mt-4 items-center">
                      <BsPerson className="mr-2 " />
                      <span>{projectDetails.projectOwner.charAt(0)}</span>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error(
                  `Error parsing project details for ${projectName}:`,
                  error
                );
                return null; // Return null or handle the error as needed
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
