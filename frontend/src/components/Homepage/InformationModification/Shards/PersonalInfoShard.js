import { useState, useEffect, useRef } from "react";
// Global Functions
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Components
import BasicTextInputComponent from "../AuxiliarComponents/BasicTextInputComponent";
import SimpleDateComponent from "../AuxiliarComponents/SimpleDateComponent";

const PersonalInfoShard = ({ oldData, email }) => {
  const { token } = useSelector((state) => state.userControllerReducer);
  // Definizione degli stati
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthday] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [flushTrigger, setFlushTrigger] = useState(false);
  const dateRef = useRef("");

  // Definizione del dispatcher per accedere allo stato di Redux
  const dispatcher = useDispatch();

  const handleDataSubmission = () => {
    console.log("helo from Personal Info Shard");
    setMessage("");
    setColor("");
    const user = {
      address: address !== "" ? address : oldData.address,
      postalCode: postalCode !== "" ? postalCode : oldData.postalCode,
      city: city !== "" ? city : oldData.city,
      birthday: birthday !== "" ? birthday : oldData.birthday,
      telephoneNumber:
        telephoneNumber !== "" ? telephoneNumber : oldData.telephoneNumber,
    };
    console.log("handleDataSubmission: ", user);
    GlobalCommunications.addPersonalData(
      token,
      user,
      dispatcher,
      email,
      setMessage,
      setColor,
      setFlushTrigger
    );
    return;
  };

  useEffect(() => {
    let timeout;
    if (flushTrigger) {
      timeout = setTimeout(() => {
        setFlushTrigger(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [flushTrigger]);

  return (
    <>
      <div className="form-group">
        {/* COMPLEANNO */}
        <SimpleDateComponent
          title="Data di nascita"
          error={error}
          dateRef={dateRef}
        />
        <button
          className="btn-sm btn-primary ml-5"
          onClick={() => {
            if (error !== "") {
              setError("");
            }
            const date = GlobalUtilities.dateSlicer(dateRef);
            const today = new Date().getFullYear();
            if (today - date.year >= 18) {
              setBirthday(date);
            } else {
              setError("!");
            }
          }}
        >
          VALIDATE
        </button>
      </div>
      {/* INDIRIZZO */}
      <div className="form-group">
        <BasicTextInputComponent
          componentLabel="Address"
          componentId="address"
          placeholderTxt={oldData.address}
          setStatus={setAddress}
          flushTrigger={flushTrigger}
        />
      </div>
      <div className="form-group">
        <div className="row">
          {/* CODICE POSTALE */}
          <BasicTextInputComponent
            componentLabel="Postal code"
            componentId="postal-code"
            placeholderTxt={oldData.postalCode}
            setStatus={setPostalCode}
            flushTrigger={flushTrigger}
          />
          {/* CITTA' DI RESIDENZA */}
          <BasicTextInputComponent
            componentLabel="City"
            componentId="city"
            placeholderTxt={oldData.city}
            setStatus={setCity}
            flushTrigger={flushTrigger}
          />
        </div>
      </div>
      {/* NUMERO DI TELEFONO */}
      <div className="form-group">
        <BasicTextInputComponent
          componentLabel="Telephone number"
          componentId="telephone-number"
          placeholderTxt={oldData.telephoneNumber}
          setStatus={setTelephoneNumber}
          flushTrigger={flushTrigger}
        />
      </div>
      <button className="btn btn-primary" onClick={handleDataSubmission}>
        SUBMIT!
      </button>
      <br />
      <label className="mt-3" style={{ color: color }}>
        {message}
      </label>
    </>
  );
};

export default PersonalInfoShard;
