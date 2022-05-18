import { useRef, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";
import { changeStatus } from "../../../Redux/UserState";

const DaySelectorComponent = ({ setDate, title, validator, noButton }) => {
  // Definizione degli stati
  const [error, setError] = useState("");

  // Definizione di variabili ausiliarie
  const date = useRef("");

  // Definizione del dispatcher per richiamare il reducer per submissible
  const dispatcher = useDispatch();

  // Attingo a submissible presente nello stato
  const { submissible } = useSelector((state) => state.userControllerReducer);

  const dateTransform = () => {
    const { day, month, year } = GlobalUtilities.dateSlicer(date);

    console.log("dateTransform", submissible);
    if (!validator(day, month, year, setDate, setError)) {
      if (submissible) {
        console.log("!validator, true", submissible);
        dispatcher(changeStatus());
      }
    } else {
      if (!submissible) {
        console.log("validator, false", submissible);
        dispatcher(changeStatus());
      }
    }
  };

  return (
    <div className="form-group mt-3">
      <label>{title}</label>
      <div className="form-group">
        <div className="d-flex justify-content-around align-items-baseline">
          <h5 style={{ color: "red" }} className="mr-2">
            {error}
          </h5>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-calendar-alt" />
              </span>
            </div>
            <input
              type="date"
              className="form-control"
              data-inputmask-alias="datetime"
              data-inputmask-inputformat="dd/mm/yyyy"
              data-mask
              inputMode="numeric"
              placeholder="dd/mm/yyyy"
              ref={date}
            />
            {noButton ? (
              <></>
            ) : (
              <button className="btn btn-primary ml-3" onClick={dateTransform}>
                VALIDATE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelectorComponent;
