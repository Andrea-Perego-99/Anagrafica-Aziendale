import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Components
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import ExperienceComponent from "../AuxiliarComponents/ExperienceComponent";

const PreviousExperiencesShard = ({ previousExperiences }) => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [tmpExperiences, setTmpExperiences] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const dispatcher = useDispatch();

  useEffect(() => {
    setTmpExperiences(previousExperiences);
    return;
  }, [previousExperiences]);

  const submitExperiences = () => {
    console.log("tmpExperiences: ", tmpExperiences);
    GlobalCommunications.addExperiences(
      token,
      tmpExperiences,
      dispatcher,
      setMessage,
      setColor
    );
  };

  return (
    <div className="card-body">
      <ExperienceComponent
        oldExperiences={tmpExperiences}
        setOldExperiences={setTmpExperiences}
      />
      <button className="btn btn-primary" onClick={submitExperiences}>
        SUBMIT
      </button>
      <br />
      <label className="mt-3" style={{ color: color }}>
        {message}
      </label>
    </div>
  );
};

export default PreviousExperiencesShard;
