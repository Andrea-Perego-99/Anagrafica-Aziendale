// Redux
import { useSelector } from "react-redux";
// Router
import { useHistory } from "react-router-dom";
// Components
import Metrics from "./Metrics/Metrics";
import Logout from "../LogoutComponent/Logout";
import PastExperiences from "../PastExperiences/PastExperiences";
import UpdateHomepage from "./InformationModification/UpdateHomepage";
import ProfileComponent from "./ProfileComponent/ProfileComponent";
import AdminComponent from "./AdminComponent/AdminComponent";
import PdfGenerator from "./PdfGenerator/PdfGenerator";

const HomepageElement = () => {
  const previousUserData = useSelector((state) => state.userControllerReducer);
  const history = useHistory();

  return (
    <div style={{ height: "100%" }}>
      <div className="card-body" style={{ height: "100%" }}>
        <div className="tab-content" style={{ height: "100%" }}>
          {previousUserData.authority !== "SUPERADMIN" ? (
            <>
              <div className="tab-pane active" id="profile">
                <ProfileComponent />
              </div>
              <div className="tab-pane" id="visual">
                <Metrics />
              </div>
              <div className="tab-pane" id="experiences">
                <PastExperiences />
              </div>
              <div className="tab-pane" id="pdf" style={{ height: "100%" }}>
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-header" style={{ height: "100%" }}>
                    <button
                      className="btn btn-info"
                      onClick={(e) => {
                        history.replace("/home/cv");
                      }}
                    >
                      FULLSCREEN
                    </button>
                    <div className="card-body" style={{ height: "100%" }}>
                      <PdfGenerator />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="settings">
                <UpdateHomepage previousUserData={previousUserData} />
              </div>
            </>
          ) : (
            <></>
          )}
          {previousUserData.authority === "SUPERADMIN" ||
          previousUserData.authority === "ADMIN" ? (
            <div className="tab-pane" id="admin">
              <AdminComponent />
            </div>
          ) : (
            <></>
          )}
          <div className="tab-pane" id="logout">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomepageElement;
