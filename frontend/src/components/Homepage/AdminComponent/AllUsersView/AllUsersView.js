import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ModificationPage from "../../../ModificationPage/ModificationPage";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import UserView from "../UserView/UserView";

const AllUsersView = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [clicked, setClicked] = useState(false);
  const [mode, setMode] = useState("");
  const [user, setUser] = useState(null);
  const { token, authority } = useSelector(
    (state) => state.userControllerReducer
  );
  const { name, surname } = useSelector((state) => state.userControllerReducer);

  const getAllUsers = () => {
    setMessage("");
    GlobalCommunications.getAllUsers(token, setUsers, setColor, setMessage);
  };

  const redirectModification = (e) => {
    if (clicked) {
      setClicked(false);
    }
    const userID = JSON.parse(e.target.id);
    GlobalCommunications.getUserByEmail(
      userID.name + "." + userID.surname + "@certimeter.it",
      token,
      setUser
    );
    console.log("userID: ", user);
    setMode("modification");
    setClicked(!clicked);
    return;
  };

  const redirectVisualization = (e) => {
    if (clicked) {
      setClicked(false);
    }
    const userID = JSON.parse(e.target.id);
    GlobalCommunications.getUserByEmail(
      userID.name + "." + userID.surname + "@certimeter.it",
      token,
      setUser
    );
    console.log("userID: ", user);
    setMode("visualization");
    setClicked(!clicked);
    return;
  };

  const changeUserStatus = (e) => {
    const userID = JSON.parse(e.target.id);
    let url;
    if (authority === "SUPERADMIN") {
      url = "http://localhost:8080/securitySuper/disable";
      GlobalCommunications.changeUserStatus(
        url,
        token,
        userID.name + "." + userID.surname + "@certimeter.it",
        !userID.enabled,
        setUsers
      );
    } else {
      url = "http://localhost:8080/security/disable";
      GlobalCommunications.changeUserStatus(
        url,
        token,
        userID.name + "." + userID.surname + "@certimeter.it",
        !userID.enabled,
        setUsers
      );
    }
  };

  useEffect(() => {
    console.log(users);
    return;
  }, [users]);

  return (
    <>
      <div className="card-body">
        {!clicked ? (
          <>
            <p>
              <strong>
                Cliccare sul pulsante qui sotto per recuperare tutti gli utenti
                presenti all'interno del database
              </strong>
            </p>
            <button className="btn btn-info" onClick={getAllUsers}>
              FETCH
            </button>
            <br />
            <label style={{ color: color }}>{message}</label>
            <table className="table table-borderless mt-3">
              <thead
                className="thead-light"
                style={{ border: "1px solid white", borderRadius: "20px" }}
              >
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Modify Data</th>
                  <th scope="col">View Data</th>
                  <th scope="col">Disable User</th>
                </tr>
              </thead>
              {users ? (
                users.map((systemUser, key) => {
                  console.log(systemUser);
                  if (
                    name === systemUser.name &&
                    surname === systemUser.surname
                  ) {
                    return;
                  } else if (systemUser.authority === "SUPERADMIN") {
                    return;
                  } else {
                    return authority === "SUPERADMIN" &&
                      systemUser.authority === "ADMIN" ? (
                      <tbody key={key}>
                        <tr>
                          <td>
                            <h6>{systemUser.name}</h6>
                          </td>
                          <td>
                            <h6>{systemUser.surname}</h6>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              id={JSON.stringify({
                                name: systemUser.name,
                                surname: systemUser.surname,
                              })}
                              onClick={redirectModification}
                            >
                              MODIFY DATA
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              id={JSON.stringify({
                                name: systemUser.name,
                                surname: systemUser.surname,
                              })}
                              onClick={redirectVisualization}
                            >
                              VIEW DATA
                            </button>
                          </td>
                          <td>
                            {systemUser.enable ? (
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                  enabled: systemUser.enable,
                                })}
                                onClick={changeUserStatus}
                              >
                                DISABLE
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                  enabled: systemUser.enable,
                                })}
                                onClick={changeUserStatus}
                              >
                                DISABLE
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ) : authority === "ADMIN" ? (
                      <tbody key={key}>
                        <tr>
                          <td>
                            <h6>{systemUser.name}</h6>
                          </td>
                          <td>
                            <h6>{systemUser.surname}</h6>
                          </td>
                          <td>
                            {authority === "ADMIN" &&
                            systemUser.authority === "ADMIN" ? (
                              <button
                                type="button"
                                className="btn btn-info btn-sm"
                                disabled={true}
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                })}
                                onClick={redirectModification}
                              >
                                MODIFY DATA
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-info btn-sm"
                                disabled={false}
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                })}
                                onClick={redirectModification}
                              >
                                MODIFY DATA
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info btn-sm"
                              id={JSON.stringify({
                                name: systemUser.name,
                                surname: systemUser.surname,
                              })}
                              onClick={redirectVisualization}
                            >
                              VIEW DATA
                            </button>
                          </td>
                          <td>
                            {systemUser.enable ? (
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                  enabled: systemUser.enable,
                                })}
                                onClick={changeUserStatus}
                              >
                                DISABLE
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                id={JSON.stringify({
                                  name: systemUser.name,
                                  surname: systemUser.surname,
                                  enabled: systemUser.enable,
                                })}
                                onClick={changeUserStatus}
                              >
                                DISABLE
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <></>
                    );
                  }
                })
              ) : (
                <></>
              )}
            </table>
          </>
        ) : mode === "modification" ? (
          <ModificationPage
            user={user}
            setClicked={setClicked}
            setUsers={setUsers}
            setUser={setUser}
          />
        ) : mode === "visualization" ? (
          <UserView user={user} setClicked={setClicked} setUser={setUser} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AllUsersView;
