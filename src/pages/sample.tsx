import { useState } from "react";
import { BsPeople, BsPerson } from "react-icons/bs";

const ProjectListPage: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDropdownOpen(true);
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ x: rect.left, y: rect.bottom });
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col p-10 items-center h-full">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 text-left border-b border-blue-900 pb-2">
          All Projects
        </h1>
        {/* Input and other elements */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ key, details }) => (
            <div
              key={key}
              className="bg-white border border-gray-100 hover:border-blue-900 transition duration-300 ease-in-out transform hover:scale-105 shadow-md rounded-md p-6 hover:shadow-lg transition duration-300 h-50 overflow-hidden"
            >
              {/* Project content */}

              <div className="flex mt-4 justify-between bg-gray-100 p-3 items-center">
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <BsPeople className="mr-2 text-blue-900 transition duration-300 ease-in-out transform hover:scale-105" />
                  {isDropdownOpen && (
                    <div
                      className="absolute bg-white border border-gray-100 shadow-md rounded-md p-2"
                      style={{
                        top: dropdownPosition.y,
                        left: dropdownPosition.x,
                      }}
                    >
                      {/* Dropdown content */}
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
