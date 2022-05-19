// Redux
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// Environment variables
import Environment from "../../Environment";
import GlobalUtilities from "../../GlobalFunctions/GlobalUtilities";

export const userSlice = createSlice({
  name: "userState",
  initialState: {
    email: "",
    token: "",
    name: "",
    surname: "",
    address: "",
    postalCode: "",
    city: "",
    telephoneNumber: "",
    image: "",
    birthday: "",
    hardSkills: [],
    officeSuiteSkills: [],
    softSkills: [],
    previousExperiences: [],
    // ONLY ADMIN CAN MODIFY THESE INFORMATIONS
    position: "",
    authority: "guest",
    salary: "",
    enabled: true,
  },

  reducers: {
    // Reducer di logout per la pulizia dello stato
    logout: async () => {
      localStorage.clear();
    },

    // Reducer di login per l'accesso dell'utente all'applicazione
    login: (state, action) => {
      console.log(action.payload.token);
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = "";
      state.surname = "";
      state.address = "";
      state.postalCode = "";
      state.city = "";
      state.telephoneNumber = "";
      state.birthday = "";
      state.hardSkills = [];
      state.officeSuiteSkills = [];
      state.softSkills = [];
      state.previousExperiences = [];
      // ONLY ADMIN CAN MODIFY THESE INFORMATIONS
      state.position = "";
      state.authority = "user";
      state.salary = "";
      state.enabled = true;
    },

    updateAllUserInformations: (state, action) => {
      console.log("parsing: ", action.payload.user);
      const user = GlobalUtilities.backendDataProcessing(action.payload.user);
      console.log("USER: ", user);
      state.name = user.name;
      state.surname = user.surname;
      state.address = user.address;
      state.postalCode = user.postalCode;
      state.city = user.city;
      state.telephoneNumber = user.telephoneNumber;
      state.birthday = user.birthday;
      state.previousExperiences = user.previousExperiences;
      state.hardSkills = user.hardSkills;
      state.softSkills = user.softSkills;
      state.officeSuiteSkills = user.officeSuiteSkills;
      state.position = user.position;
      state.authority = user.authority;
      state.salary = user.salary;
      state.enabled = user.enable;
    },

    // Slim Reducers che agiscono all'interno degli shard
    // Ci sarà uno slim reducer per shard e quindi uno per "sezione" del form

    // Reducer associato alle informazioni anagrafiche
    personalInfoReducer: (state, action) => {
      state.address = action.payload.address;
      state.postalCode = action.payload.postalCode;
      state.city = action.payload.city;
      state.telephoneNumber = action.payload.telephoneNumber;
      state.birthday = action.payload.birthday;
    },

    imageReducer: (state, action) => {
      state.image = action.payload.image;
    },

    // Reducer associato alle hard skill
    hardSkillsReducer: (state, action) => {
      state.hardSkills = action.payload.hardSkills;
    },

    // Reducer associato alle skill legate al pacchetto office
    officeSkillsReducer: (state, action) => {
      state.officeSuiteSkills = action.payload.officeSuiteSkills;
    },

    // Reducer associato alle soft skills
    softSkillsReducer: (state, action) => {
      state.softSkills = action.payload.softSkills;
    },

    // Reducer associato alle esperienze pregresse
    experiencesReducer: (state, action) => {
      state.previousExperiences = action.payload.experiences;
    },

    // Reducer associato all'admin
    adminReducer: (state, action) => {
      state.position = action.payload.position;
      state.authority = action.payload.authority;
      state.salary = action.payload.salary;
    },

    enabledReducer: (state) => {
      state.enabled = !state.enabled;
    },

    // Reducer ausiliario per il form
    changeStatus: (state) => {
      if (state.submissible) {
        state.submissible = false;
      } else {
        state.submissible = true;
      }
    },

    // CHEAT DA RIMUOVERE
    adminCheat: (state) => {
      if (state.authority === "admin") {
        state.authority = "user";
      } else {
        state.authority = "admin";
      }
      console.log(state.authority);
    },
  },
});

export const {
  login,
  logout,
  personalInfoReducer,
  imageReducer,
  updateAllUserInformations,
  hardSkillsReducer,
  officeSkillsReducer,
  softSkillsReducer,
  experiencesReducer,
  enabledReducer,
  adminReducer,
  changeStatus,
  adminCheat,
} = userSlice.actions;

export default userSlice.reducer;
