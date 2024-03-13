// ProjectListItem.tsx
import React from "react";
import { Link } from "react-router-dom";

interface ProjectListItemProps {
  projectName: string;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ projectName }) => {
  return (
    <li className="mb-2">
      <Link
        to={`/projects/${projectName}`}
        className="text-blue-500 hover:underline"
      >
        {projectName}
      </Link>
    </li>
  );
};

export default ProjectListItem;
