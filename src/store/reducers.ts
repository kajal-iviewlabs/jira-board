import { ProjectDetails } from "../components/projectForm/ProjectCreationForm";

type Action = {
  type: string;
  payload: ProjectDetails;
};

const initialState: ProjectDetails = {
  projectName: "",
  projectDescription: "",
  projectStartDate: "",
  projectEndDate: "",
  projectOwner: "",
  projectStatus: "",
  invitedEmails: [],
  taskData: [],
};

const projectReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
