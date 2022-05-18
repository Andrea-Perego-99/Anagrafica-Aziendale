import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GlobalCommunications from "../../../GlobalFunctions/GlobalCommunications";

const ProfileComponent = ({ user, mode }) => {
  const userData = useSelector((state) => state.userControllerReducer);
  const [userByEmail, setUserByEmail] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!user) {
      console.log("userData: ", userData);
      setUserByEmail(userData);
    } else {
      console.log("user: ", user);
      setUserByEmail(user);
    }
    return;
  }, [user, userData]);

  useEffect(() => {
    if (mode) {
      console.log("visualizzazione utente");
      setUserByEmail(user);
    } else {
      console.log("visualizzazione self");
      setUserByEmail(userData);
    }
    return;
  }, [mode]);

  return (
    <div className="card card-primary">
      <div className="card-body box-profile">
        {userByEmail ? (
          <>
            <div className="text-center">
              {userByEmail.image ? (
                <img
                  className="profile-user-img img-fluid img-circle"
                  src={
                    userByEmail.image ? userByEmail.image : image.payload.image
                  }
                  alt=""
                />
              ) : (
                <></>
              )}
            </div>
            <h3 className="profile-username text-center">
              {userByEmail.surname} {userByEmail.name}
            </h3>
            <p className="text-muted text-center">{userByEmail.position}</p>
            <strong>
              <i className="fas fa-envelope mr-1"></i> Email
            </strong>
            <p className="text-muted">{userByEmail.email}</p>
            <hr />
            <strong>
              <i className="fas fa-mobile mr-1"></i> Cellulare
            </strong>
            <p className="text-muted">{userByEmail.telephoneNumber}</p>
            <hr />
            <strong>
              <i className="fas fa-home mr-1"></i> Indirizzo
            </strong>
            <p className="text-muted">
              {userByEmail.address + ", " + userByEmail.postalCode}
            </p>
            <hr />
            <strong>
              <i className="fas fa-map-marker mr-1"></i> Città
            </strong>
            <p className="text-muted">{userByEmail.city}</p>
            <hr />
            <strong>
              <i className="fa fa-university mr-1"></i> Stipendio
            </strong>
            <p className="text-muted">{userByEmail.salary}</p>
            <hr />
            <strong>
              <i className="fasmr-1"></i> Data di nascita
            </strong>
            {userByEmail.birthday ? (
              <p className="text-muted">
                {userByEmail.birthday.day +
                  "/" +
                  userByEmail.birthday.month +
                  "/" +
                  userByEmail.birthday.year}
                {/* {userByEmail.birthday} */}
              </p>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
