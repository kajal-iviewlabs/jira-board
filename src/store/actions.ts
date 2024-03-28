import { ProjectDetails } from "../components/projectForm/ProjectCreationForm";

export const CREATE_PROJECT = "CREATE_PROJECT";

export const createProject = (projectDetails: ProjectDetails) => ({
  type: CREATE_PROJECT,
  payload: projectDetails,
});
