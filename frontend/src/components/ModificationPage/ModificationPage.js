import { useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Global functions
import GlobalCommunications from "../../GlobalFunctions/GlobalCommunications";
// Components
import UpdateHomepage from "../Homepage/InformationModification/UpdateHomepage";

const ModificationPage = ({ user, setClicked, setUsers, setUser }) => {
  const { token, authority } = useSelector(
    (state) => state.userControllerReducer
  );
  const [error, setError] = useState("");
  const [deletionVisible, setDeletionVisible] = useState("collapse");

  const handleDeletion = async () => {
    let url;
    if (authority === "SUPERADMIN") {
      url = "http://localhost:8080/securitySuper/delete/pro";
      GlobalCommunications.deleteUser(
        url,
        token,
        user.email,
        setClicked,
        setUsers
      );
    } else {
      url = "http://localhost:8080/security/delete";
      GlobalCommunications.deleteUser(
        url,
        token,
        user.email,
        setClicked,
        setUsers
      );
    }
  };

  const displayChange = () => {
    if (deletionVisible === "visible") {
      setDeletionVisible("collapse");
    } else {
      setDeletionVisible("visible");
    }
  };

  return (
    <>
      {user ? (
        <div className="container-fluid">
          <button
            className="btn btn-info"
            onClick={() => {
              setClicked(false);
              setUser(null);
            }}
          >
            BACK HOME
          </button>
          <div className="header">
            <h5
              className="title ml-2 mt-3 mb-3"
              style={{
                fontFamily: "Syncopate, sans-serif",
                textTransform: "uppercase",
              }}
            >
              {user.email}
            </h5>
          </div>
          <UpdateHomepage previousUserData={user} email={user.email} />
          <div style={{ visibility: deletionVisible }}>
            <label className="d-flex justify-content-center">
              Sicuro di voler eliminare l'utente? L'operazione non è reversibile
            </label>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mr-5" onClick={handleDeletion}>
                SI
              </button>
              <button className="btn btn-primary ml-5" onClick={displayChange}>
                NO
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button className="btn btn-danger" onClick={displayChange}>
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <h1 style={{ color: "red" }}>{error}</h1>
      )}
    </>
  );
};
export default ModificationPage;
