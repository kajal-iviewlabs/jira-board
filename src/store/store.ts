import { createStore } from "redux";
import projectReducer from "./reducers";

const store = createStore(projectReducer);

export default store;
