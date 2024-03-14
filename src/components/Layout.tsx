import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectPage from "../pages/Project";
import ProjectListPage from "../pages/ProjectListPage";
import ProjectCreationForm from "./ProjectCreationForm";
import Home from "../pages/Home";

const Layout = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAuthenticated && (
        <>
          <Route path="/create" element={<ProjectCreationForm />} />
          <Route path="/project/:projectName" element={<ProjectPage />} />
          <Route path="/view" element={<ProjectListPage />} />
        </>
      )}
    </Routes>
  );
};

export default Layout;
