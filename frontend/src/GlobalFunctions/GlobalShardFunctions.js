import {
  hardSkillsReducer,
  officeSkillsReducer,
  softSkillsReducer,
  // programmingSkillsReducer,
  // frameworkSkillsReducer,
} from "../components/Redux/UserState";
import GlobalUtilities from "./GlobalUtilities";

const GlobalShardFunctions = {
  officeReducerCaller: (skills, proficencies, dispatcher) => {
    const officeSkills = GlobalUtilities.arrayMerger(skills, proficencies);
    dispatcher(
      officeSkillsReducer({
        officeSuiteSkills: officeSkills,
      })
    );
  },

  softSkillsReducerCaller: (skills, proficencies, dispatcher) => {
    const softSkills = GlobalUtilities.arrayMerger(skills, proficencies);
    dispatcher(
      softSkillsReducer({
        softSkills: softSkills,
      })
    );
  },

  hardSkillReducerCaller: (skills, proficencies, dispatcher) => {
    const hardSkills = GlobalUtilities.arrayMerger(skills, proficencies);
    dispatcher(hardSkillsReducer({ hardSkills: hardSkills }));
  },

  // programmingReducerCaller: (skills, proficencies, dispatcher) => {
  //   dispatcher(
  //     programmingSkillsReducer({
  //       programmingLanguageSkills: skills,
  //       programmingLanguageProficencies: proficencies,
  //     })
  //   );
  // },

  // frameworkReducerCaller: (skills, proficencies, dispatcher) => {
  //   dispatcher(
  //     frameworkSkillsReducer({
  //       frameworkSkills: skills,
  //       frameworkProficencies: proficencies,
  //     })
  //   );
  // },
};

export default GlobalShardFunctions;
