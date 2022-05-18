import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
// Components
import Sidebar from "../Menu/Sidebar";
// Redux
import { useSelector } from "react-redux";
import HomepageElement from "./HomepageElements";

const HomepageComponent = () => {
  const [menuToggle, setMenuToggle] = useState("visible");

  return (
    <>
      <section className="content" style={{ height: "100%" }}>
        <div className="container-fluid" style={{ height: "100%" }}>
          <div className="row" style={{ height: "100%" }}>
            <Sidebar menuToggle={menuToggle} />
            <div className="col-md-9">
              <HomepageElement
                menuToggle={menuToggle}
                setMenuToggle={setMenuToggle}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomepageComponent;
