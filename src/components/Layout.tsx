// Layout.js
import { Routes, Route } from "react-router-dom";
import ProjectPage from "../pages/Project";
import ProjectListPage from "../pages/ProjectListPage";
import ProjectCreationForm from "./ProjectCreationForm";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/create" element={<ProjectCreationForm />} />
        <Route path="/project/:projectName" element={<ProjectPage />} />
        <Route path="/view" element={<ProjectListPage />} />
      </Route>
    </Routes>
  );
};

export default Layout;
