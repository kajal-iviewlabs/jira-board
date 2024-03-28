import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa"; // Import task icon
import { BsPerson, BsPeople } from "react-icons/bs"; // Import person icon

const Work: React.FC = () => {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentProjects = () => {
      const recentProjectsData = JSON.parse(
        localStorage.getItem("recentProjects") || "[]"
      );
      setRecentProjects(recentProjectsData.slice(0, 10));
    };

    fetchRecentProjects();
  }, []);

  const handleProjectClick = (project: any) => {
    const updatedRecentProjects = [
      project,
      ...recentProjects.filter((p) => p.projectName !== project.projectName),
    ].slice(0, 10);
    localStorage.setItem(
      "recentProjects",
      JSON.stringify(updatedRecentProjects)
    );
    setRecentProjects(updatedRecentProjects);
  };

  return (
    <div className="flex flex-col p-10 items-center h-full">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-left border-b border-blue-900 pb-2">
          Recent Projects
        </h1>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 hover:border-blue-900 transition duration-300 ease-in-out transform hover:scale-105 shadow-md rounded-md p-6 hover:shadow-lg transition duration-300 max-w-xs"
              >
                <Link
                  to={`/project/${project.projectName}`}
                  className="text-blue-900 hover:underline flex items-center mb-2"
                  onClick={() => handleProjectClick(project)} // Call handleProjectClick on project click
                >
                  <FaTasks className="mr-2" />
                  <h2 className="text-xl font-semibold truncate">
                    {project.projectName}
                  </h2>
                </Link>
                <p className="overflow-hidden line-clamp-3 mb-2 h-16">
                  {project.projectDescription}
                </p>
                <div className="flex mt-4 justify-between bg-gray-100 p-3 items-center">
                  <BsPeople className="mr-2 text-blue-900 transition duration-300 ease-in-out transform hover:scale-105" />
                  <span className="flex items-center text-blue-900">
                    <BsPerson />
                    <span className="ml-1">
                      {project.projectOwner ? project.projectOwner : ""}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
