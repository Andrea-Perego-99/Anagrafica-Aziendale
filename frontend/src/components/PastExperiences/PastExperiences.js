import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import ExperienceComponent from "./ExperienceComponent";
import GlobalUtilities from "../../GlobalFunctions/GlobalUtilities";

const PastExperiences = ({ user }) => {
  const userData = useSelector((state) => state.userControllerReducer);
  const [previousExperiences, setPreviousExperiences] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [consultantExperiences, setConsultantExperiences] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("userData: ", userData);
      setPreviousExperiences(userData.previousExperiences);
    } else {
      console.log("user: ", user);
      setPreviousExperiences(user.previousExperiences);
    }
    return;
  }, [user, userData]);

  useEffect(() => {
    let tmpExperiences = [];
    let tmpConsultantExperiences = [];
    previousExperiences.forEach((experience) => {
      if (
        (experience.company === "Certimeter" ||
          experience.company === "certimeter") &&
        experience.companyConsulting
      ) {
        tmpConsultantExperiences.push(experience);
      } else {
        tmpExperiences.push(experience);
      }
    });
    console.log("tmpExperiences: ", tmpExperiences);
    console.log("tmpConsultantExperiences: ", tmpConsultantExperiences);
    setExperiences([...tmpExperiences]);
    setConsultantExperiences([...tmpConsultantExperiences]);
    return;
  }, [previousExperiences]);

  return (
    <div className="card-body">
      <div className="previous-experiences">
        <h3>Previous Experiences</h3>
        {experiences ? (
          experiences.map((experience) => {
            return (
              <div
                className="border border-2 border-primary mt-2"
                key={JSON.stringify(experience)}
              >
                <ExperienceComponent
                  company={experience.company}
                  position={experience.position}
                  firstDay={experience.startDate}
                  lastDay={experience.endDate}
                  experienceSummary={experience.description}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="consultant-experiences mt-3">
        <h3>Consultant Experiences</h3>
        {consultantExperiences ? (
          consultantExperiences.map((experience) => {
            return (
              <div
                className="border border-2 border-primary mt-2"
                key={GlobalUtilities.stringify(experience)}
              >
                <ExperienceComponent
                  company={experience.companyConsulting}
                  position={experience.position}
                  firstDay={experience.startDate}
                  lastDay={experience.endDate}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default connect()(PastExperiences);
