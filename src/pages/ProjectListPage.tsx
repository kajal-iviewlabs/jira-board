import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa"; // Import task icon
import { BsPerson, BsPeople } from "react-icons/bs"; // Import person icon
import { useAuth0 } from "@auth0/auth0-react";

const ProjectListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [projects, setProjects] = useState<{ key: string; details: any }[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.name) return;
      const url = `https://project-management-tool-2dcae-default-rtdb.firebaseio.com/${user.name}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        const projectKeys = Object.keys(data || {});
        const projectDetails = projectKeys.map((key) => ({
          key,
          details: data[key],
          isDropdownOpen: false,
        }));
        setProjects(projectDetails);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  const storeRecentProject = async (projectDetails: any) => {
    let recentProjects = JSON.parse(
      localStorage.getItem("recentProjects") || "[]"
    );

    // Check if the project already exists in the recent projects list
    const existingProjectIndex = recentProjects.findIndex(
      (project: any) => project.projectName === projectDetails.projectName
    );

    if (existingProjectIndex !== -1) {
      // If the project exists, remove it from its current position
      recentProjects.splice(existingProjectIndex, 1);
    }

    // Add the latest clicked project at the beginning of the recent projects list
    recentProjects = [projectDetails, ...recentProjects.slice(0, 9)];

    // Update localStorage with the updated recent projects list
    localStorage.setItem("recentProjects", JSON.stringify(recentProjects));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMouseEnter = (key: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.key === key ? { ...project, isDropdownOpen: true } : project
      )
    );
  };

  const handleMouseLeave = (key: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.key === key ? { ...project, isDropdownOpen: false } : project
      )
    );
  };

  return (
    <div className="flex flex-col p-10 items-center h-full">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-left border-b border-blue-900 pb-2">
          All Projects
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search project..."
          className="w-full mb-6 mr-6 px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter(({ details }) =>
              details.projectName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map(({ key, details, isDropdownOpen }) => (
              <div
                key={key}
                className="bg-white border border-gray-100 hover:border-blue-900 transition duration-300 ease-in-out hover:scale-105 shadow-md rounded-md p-6 hover:shadow-lg transition duration-300 h-50"
              >
                <Link
                  to={`/project/${details.projectName}`}
                  className="text-blue-900 hover:underline flex items-center mb-2"
                  onClick={() => storeRecentProject(details)}
                >
                  <FaTasks className="mr-2" />
                  <h2 className="text-xl font-semibold truncate">
                    {details.projectName}
                  </h2>
                </Link>
                <p className="overflow-hidden line-clamp-3 mb-2 h-16">
                  {details.projectDescription}
                </p>
                <div className="flex mt-4 justify-between bg-gray-100 p-3 items-center">
                  <div
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={() => handleMouseLeave(key)}
                  >
                    <BsPeople className="mr-2 text-blue-900 transition duration-300 ease-in-out transform hover:scale-105" />
                    {isDropdownOpen && (
                      <div className="absolute bg-white border border-gray-100 shadow-md rounded-md p-2">
                        <h3 className="font-bold text-blue-900 mb-3">
                          Project Members:
                        </h3>
                        <div className="flex p-2 items-center">
                          <div className="mr-3 bg-blue-900 text-white rounded-full h-8 w-8 flex justify-center items-center justify-center">
                            <BsPerson size={22} />
                          </div>
                          <div>
                            <span>{details.projectOwner}</span>
                            <span className="text-gray-400 text-xs block overflow-hidden truncate whitespace-nowrap">
                              Owner
                            </span>
                          </div>
                        </div>
                        {details.invitedEmails
                          .slice(1)
                          .map((person: string, index: number) => (
                            <div key={index} className="flex p-2 items-center">
                              <div className="mr-3 bg-blue-900 text-white rounded-full h-8 w-8 flex items-center justify-center">
                                <BsPerson size={22} />
                              </div>
                              <div>
                                <span>{person}</span>
                                <span className="text-gray-400 text-xs block overflow-hidden truncate whitespace-nowrap">
                                  Team member
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <span className="flex items-center text-blue-900">
                    <BsPerson />
                    <span className="ml-1">
                      {details.projectOwner ? details.projectOwner : ""}
                    </span>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
