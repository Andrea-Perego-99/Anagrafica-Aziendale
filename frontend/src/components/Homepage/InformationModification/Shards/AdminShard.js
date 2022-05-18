import { useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Components
import BasicTextInputComponent from "../AuxiliarComponents/BasicTextInputComponent";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";

const AdminShard = ({ oldData, email }) => {
  // Stati per l'admin
  const [position, setPosition] = useState(oldData.position);
  const [salary, setSalary] = useState(oldData.salary);
  const [clearance, setClearance] = useState(oldData.authority);
  const [error, setError] = useState("");

  const { token, authority } = useSelector(
    (state) => state.userControllerReducer
  );

  // Trigger che fa partire l'aggiornamento dello stato
  const handleAdminSubmission = () => {
    console.log("helo from AdminShard");
    let url;
    if (authority === "SUPERADMIN") {
      url = "http://localhost:8080/securitySuper/update/pro";
    } else {
      url = "http://localhost:8080/security/update";
    }
    GlobalCommunications.modifyUserAttributes(
      token,
      url,
      { salary: salary, position: position, authority: clearance },
      email
    );
    return;
  };

  return (
    <div className="row">
      <>
        <div className="row">
          <BasicTextInputComponent
            componentLabel="Position"
            componentId="position"
            placeholderTxt={oldData.position}
            setStatus={setPosition}
          />
          <BasicTextInputComponent
            componentLabel="Salary"
            componentId="salary"
            placeholderTxt={oldData.salary}
            setStatus={setSalary}
          />
          <p style={{ color: "red" }}>{error}</p>
          <BasicTextInputComponent
            componentLabel="Clearance"
            componentId="clearance"
            placeholderTxt={oldData.clearance}
            setStatus={setClearance}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={handleAdminSubmission}
        >
          SUBMIT!
        </button>
      </>
    </div>
  );
};

export default AdminShard;
