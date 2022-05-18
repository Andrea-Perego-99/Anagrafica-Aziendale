import { useState, useEffect } from "react";
// Variabili d'ambiente
import Environment from "../../../../Environment";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Components
import FormComponent from "../AuxiliarComponents/FormComponent";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import DynamicFormComponent from "../AuxiliarComponents/DynamicFormComponent";

const SelectionArrayShard = ({ oldArrayData, mode, email }) => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  // Definisco una variabile temporanea per i nuovi dati
  var [tmpArray, setTmpArray] = useState([]);
  useEffect(() => {
    setTmpArray(oldArrayData);
    return;
  }, [oldArrayData]);

  // Definisco il dispatcher che riprende i riduttori
  const dispatcher = useDispatch();

  // Configuro il componente che verrà chiamato
  let numberOfChoices = 0;
  let optionArray = [];
  if (mode === "Office Suite") {
    numberOfChoices = 4;
    optionArray = [...Environment.officeSuite];
  } else if (mode === "Soft Skills") {
    numberOfChoices = 14;
    optionArray = [...Environment.softSkills];
  }

  // Submission process
  const handleSubmission = () => {
    if (mode === "Office Suite") {
      console.log("helo from Office Shard");
      GlobalCommunications.addOfficeSkill(
        token,
        tmpArray,
        dispatcher,
        email,
        setColor,
        setMessage
      );
    } else if (mode === "Soft Skills") {
      console.log("helo from Soft Skills");
      GlobalCommunications.addSoftSkill(
        token,
        tmpArray,
        dispatcher,
        email,
        setColor,
        setMessage
      );
    } else if (mode === "Dynamic") {
      console.log("helo from Hard Skills");
      GlobalCommunications.addHardSkill(
        token,
        tmpArray,
        dispatcher,
        email,
        setColor,
        setMessage
      );
    }

    return;
  };

  return (
    <>
      {tmpArray ? (
        mode === "Dynamic" ? (
          <DynamicFormComponent
            skillArray={tmpArray}
            skillArraySetter={setTmpArray}
            email={email}
          />
        ) : (
          <FormComponent
            maxEntries={numberOfChoices}
            array={optionArray}
            skillArray={tmpArray}
            skillArraySetter={setTmpArray}
            title={mode}
            email={email}
          />
        )
      ) : (
        <></>
      )}

      <button className="btn btn-primary" onClick={handleSubmission}>
        SUBMIT!
      </button>
      <br />
      <label className="mt-3" style={{ color: color }}>
        {message}
      </label>
    </>
  );
};

export default SelectionArrayShard;
