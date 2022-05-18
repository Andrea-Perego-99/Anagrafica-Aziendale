import ProfileComponent from "../../ProfileComponent/ProfileComponent";
import Metrics from "../../Metrics/Metrics";
import PastExperiences from "../../../PastExperiences/PastExperiences";

const UserView = ({ user, setClicked, setUser }) => {
  console.log("user: ", user);
  return (
    <div className="card">
      <div className="card-header">
        <button
          className="btn btn-info"
          onClick={(e) => {
            setClicked(false);
            setUser(null);
          }}
        >
          BACK HOME
        </button>
      </div>
      <div className="card-body">
        <ProfileComponent user={user} mode="user-view" />
        <Metrics user={user} />
        <PastExperiences user={user} />
      </div>
    </div>
  );
};
export default UserView;
