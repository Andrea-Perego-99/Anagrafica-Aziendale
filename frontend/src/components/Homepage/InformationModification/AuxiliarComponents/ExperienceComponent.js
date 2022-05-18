import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import BasicTextInputComponent from "./BasicTextInputComponent";
import SimpleDateComponent from "./SimpleDateComponent";

const ExperienceComponent = ({ oldExperiences, setOldExperiences }) => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [consultingCompany, setConsultingCompany] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const beginningRef = useRef("");
  const endingRef = useRef("");
  const dispatcher = useDispatch();

  const removeExperience = (e) => {
    var experiences = [...oldExperiences];
    const experienceToBeRemoved = JSON.parse(e.target.id);
    console.log("experienceToBeRemoved: ", experienceToBeRemoved);
    for (let i = 0, flag = false; i < experiences.length && !flag; i++) {
      console.log("experiences[i]: ", experiences[i]);
      if (
        GlobalUtilities.experienceEquals(experiences[i], experienceToBeRemoved)
      ) {
        experiences.splice(i, 1);
        flag = true;
      }
    }
    console.log("array: ", experiences);
    GlobalCommunications.deleteExperience(
      token,
      experienceToBeRemoved,
      dispatcher,
      experiences
    );
    setOldExperiences([...experiences]);
  };

  const addExperience = () => {
    const startDate = GlobalUtilities.dateSlicer(beginningRef);
    const endDate = GlobalUtilities.dateSlicer(endingRef);
    setMessage("");
    if (GlobalUtilities.dateComparer(startDate, endDate, setError)) {
      if (
        !isChecked &&
        !GlobalUtilities.experienceAlreadyPresent(
          { company: company, beginningDate: startDate, endingDate: endDate },
          oldExperiences
        )
      ) {
        setOldExperiences([
          ...oldExperiences,
          {
            company: company,
            startDate: startDate,
            endDate: endDate,
            companyConsulting: "",
            position: position,
            description: summary,
          },
        ]);
      } else if (
        isChecked &&
        !GlobalUtilities.consultingExperienceAlreadyPresent(
          {
            companyConsulting: consultingCompany,
            startDate: startDate,
            endDate: endDate,
          },
          oldExperiences
        )
      ) {
        setOldExperiences([
          ...oldExperiences,
          {
            company: "Certimeter",
            startDate: startDate,
            endDate: endDate,
            companyConsulting: consultingCompany,
            position: position,
            description: "",
          },
        ]);
      } else {
        setColor("red");
        setMessage(
          "Non è stato possibile inviare la richiesta, l'esperienza è già stata inserita nel sistema"
        );
      }
    }
  };

  useEffect(() => {
    console.log("oldExperiences: ", oldExperiences);
    return;
  }, [oldExperiences]);

  return (
    <div>
      <div className="d-flex align-items-baseline">
        {isChecked ? (
          <></>
        ) : (
          <BasicTextInputComponent
            componentLabel="Azienda"
            setStatus={setCompany}
          />
        )}
        <SimpleDateComponent
          title="Data di inizio"
          dateRef={beginningRef}
          error={error}
        />
        <SimpleDateComponent
          title="Data di fine"
          dateRef={endingRef}
          error={error}
        />
      </div>
      <div className="d-flex align-items-baseline">
        <div>
          <BasicTextInputComponent
            componentLabel="Posizione"
            setStatus={setPosition}
          />
        </div>
        {isChecked ? (
          <div>
            <BasicTextInputComponent
              componentLabel="Azienda Consultata"
              setStatus={setConsultingCompany}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="m-3">
        <label className="mr-3">Esperienza da consulente</label>
        <input
          type="checkbox"
          onChange={(e) => {
            setIsChecked(!isChecked);
          }}
        />
      </div>
      {isChecked ? (
        <></>
      ) : (
        <>
          <label className="ml-2">Sommario dell'esperienza</label>
          <div className="d-flex justify-content-center">
            <textarea
              cols="85"
              rows="6"
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            ></textarea>
          </div>
        </>
      )}
      <button
        className="btn btn-outline-info mt-3 ml-2"
        onClick={addExperience}
      >
        ADD
      </button>
      <br />
      <label className="ml-2 mt-3" style={{ color: color }}>
        {message}
      </label>
      <table className="table table-borderless mt-3">
        <thead
          className="thead-light"
          style={{ border: "1px solid white", borderRadius: "20px" }}
        >
          <tr>
            <th scope="col">Company</th>
            <th scope="col">StartDate</th>
            <th scope="col">EndDate</th>
            <th scope="col">Delete button</th>
          </tr>
        </thead>
        {oldExperiences ? (
          oldExperiences.map((element) => {
            console.log("element: ", element);
            if (element.companyConsulting !== "") {
              console.log("SONO UN'ESPERIENZA DI CONSULENZA");
              return (
                <tbody key={element.companyConsulting}>
                  <tr>
                    <td>
                      <h6>{element.companyConsulting}</h6>
                    </td>
                    <td>
                      <h6>
                        {element.startDate.day +
                          "/" +
                          element.startDate.month +
                          "/" +
                          element.startDate.year}
                      </h6>
                    </td>
                    <td>
                      <h6>
                        {element.endDate.day +
                          "/" +
                          element.endDate.month +
                          "/" +
                          element.endDate.year}
                      </h6>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={JSON.stringify({
                          company: "Certimeter",
                          startDate: element.startDate,
                          endDate: element.endDate,
                          position: element.position,
                          description: "",
                          companyConsulting: element.companyConsulting,
                        })}
                        onClick={removeExperience}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            } else {
              console.log("SONO UN'ESPERIENZA LAVORATIVA COMUNE");
              return (
                <tbody key={element.company}>
                  <tr>
                    <td>
                      <h6>{element.company}</h6>
                    </td>
                    <td>
                      <h6>
                        {element.startDate.day +
                          "/" +
                          element.startDate.month +
                          "/" +
                          element.startDate.year}
                      </h6>
                    </td>
                    <td>
                      <h6>
                        {element.endDate.day +
                          "/" +
                          element.endDate.month +
                          "/" +
                          element.endDate.year}
                      </h6>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={JSON.stringify({
                          company: element.company,
                          startDate: element.startDate,
                          endDate: element.endDate,
                          position: element.position,
                          description: element.description,
                          companyConsulting: "",
                        })}
                        onClick={removeExperience}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })
        ) : (
          <></>
        )}
      </table>
    </div>
  );
};
export default ExperienceComponent;
