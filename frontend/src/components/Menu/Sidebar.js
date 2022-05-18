import { useState } from "react";
import "./Style.css";
import Environment from "../../Environment";
import { useSelector } from "react-redux";

const Sidebar = ({ menuToggle }) => {
  const { name, surname, authority, image } = useSelector(
    (state) => state.userControllerReducer
  );
  return (
    <div
      className="col-md-3 sidebar-component"
      // style={{ visibility: { menuToggle } }}
    >
      <div className="card card-primary card-outline sidebar">
        <ul className="nav sidebar-list">
          <li className="background-element m-4" tabIndex={-1}>
            <a href="#profile" data-toggle="tab">
              <div className="d-flex align-items-center">
                {image ? (
                  <img
                    className="profile-user-img img-fluid img-circle ml-3"
                    src={image}
                    alt=""
                  />
                ) : (
                  <></>
                )}

                <h5 className="ml-3" style={{ color: "lightgrey" }}>
                  {name + " " + surname}
                </h5>
              </div>
            </a>
          </li>
          {Environment.sidebarData.map((element, key) => {
            if (
              authority === "SUPERADMIN" &&
              element.title !== "Admin Functions" &&
              element.title !== "Logout"
            ) {
              return;
            } else if (
              (authority === "SUPERADMIN" &&
                element.title === "AdminFunctions") ||
              element.title === "Logout"
            ) {
              return (
                <li
                  key={key}
                  style={{ width: "100%" }}
                  className="background-element"
                  tabIndex={key}
                >
                  <a
                    className="navLink"
                    href={element.link}
                    data-toggle="tab"
                    onClick={(e) => {
                      console.log(element.link);
                    }}
                  >
                    <i className={element.icon} id="icon"></i>
                    <div id="title">{element.title}</div>
                  </a>
                </li>
              );
            } else if (
              authority === "USER" &&
              element.title === "Admin Functions"
            ) {
              return;
            } else {
              return (
                <li
                  key={key}
                  style={{ width: "100%" }}
                  className="background-element"
                  tabIndex={key}
                >
                  <a
                    className="navLink"
                    href={element.link}
                    data-toggle="tab"
                    onClick={(e) => {
                      console.log(element.link);
                    }}
                  >
                    <i className={element.icon} id="icon"></i>
                    <div id="title">{element.title}</div>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
