import storage from "redux-persist/lib/storage";
import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import UserState from "./UserState";

const appReducer = combineReducers({ UserState });

const rootReducer = (state, action) => {
  if (action.type === "/logout") {
    storage.removeItem("persist: root");
    state = {
      email: "",
      token: "",
      name: "",
      surname: "",
      address: "",
      postalCode: "",
      city: "",
      telephoneNumber: "",
      birthday: Environment.epoch,
      // programmingLanguageSkills: [],
      // programmingLanguageProficencies: [],
      // frameworkSkills: [],
      // frameworkProficencies: [],
      hardSkills: [],
      // officeSuiteSkills: [],
      // officeSuiteProficencies: [],
      officeSuiteSkills: [],
      // softSkills: [],
      // softSkillsProficencies: [],
      softSkills: [],
      previousExperiences: [],
      consultantExperiences: [],
      // ONLY ADMIN CAN MODIFY THESE INFORMATIONS
      position: "",
      authority: "guest",
      salary: "",
      submissible: true,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
