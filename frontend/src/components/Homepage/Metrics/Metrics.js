// Redux
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GlobalCommunications from "../../../GlobalFunctions/GlobalCommunications";
import GlobalUtilities from "../../../GlobalFunctions/GlobalUtilities";
// Components
import MetricsComponent from "./MetricsComponent";

const Metrics = ({ user }) => {
  const userData = useSelector((state) => state.userControllerReducer);
  const { token } = useSelector((state) => state.userControllerReducer);
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [officeSuiteSkills, setOfficeSuiteSkills] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("userData: ", userData);
      setHardSkills([...userData.hardSkills]);
      setSoftSkills([...userData.softSkills]);
      setOfficeSuiteSkills([...userData.officeSuiteSkills]);
    } else {
      console.log("user: ", user);
      setHardSkills([...user.hardSkills]);
      setSoftSkills([...user.softSkills]);
      setOfficeSuiteSkills([...user.officeSuiteSkills]);
    }
    return;
  }, [user, userData]);

  const percentageConversion = (skillProficency, skill) => {
    const proficencyPercentages = [];
    if (skillProficency !== []) {
      let i = 0;
      skillProficency.forEach((proficency) => {
        proficencyPercentages.push({
          percentage: 20 * proficency + "%",
          name: skill[i].toUpperCase(),
        });
        i++;
      });
    }
    return proficencyPercentages;
  };

  let hardSkillsPercentages = [];
  if (hardSkills) {
    hardSkillsPercentages = percentageConversion(
      GlobalUtilities.getProficencies(hardSkills),
      GlobalUtilities.getSkills(hardSkills)
    );
  }

  let officeSuitePercentages = [];
  if (officeSuiteSkills) {
    console.log("officeSuiteSkills: ", officeSuiteSkills);
    officeSuitePercentages = percentageConversion(
      GlobalUtilities.getProficencies(officeSuiteSkills),
      GlobalUtilities.getSkills(officeSuiteSkills)
    );
  }

  let softSkillsPercentages = [];
  if (softSkills) {
    softSkillsPercentages = percentageConversion(
      GlobalUtilities.getProficencies(softSkills),
      GlobalUtilities.getSkills(softSkills)
    );
  }

  return (
    <>
      <MetricsComponent
        title="HARD SKILLS"
        firstCol="Conoscenza"
        secondCol="Livello"
        skillPercentages={hardSkillsPercentages}
        color="orange"
      />

      <MetricsComponent
        title="SUITE OFFICE"
        firstCol="Programma"
        secondCol="Livello"
        skillPercentages={officeSuitePercentages}
        color="purple"
      />

      <MetricsComponent
        title="SOFT SKILLS"
        firstCol="Abilità"
        secondCol="Livello"
        skillPercentages={softSkillsPercentages}
        color="pink"
      />
    </>
  );
};
export default Metrics;
