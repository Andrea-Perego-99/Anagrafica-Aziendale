import { useState, useEffect } from "react";
// Redux
import { useSelector } from "react-redux";
// Components
import MenuBar from "./MenuBar/MenuBar";
import PersonalInfoShard from "./Shards/PersonalInfoShard";
import SelectionArrayShard from "./Shards/SelectionArrayShard";
import PreviousExperiencesShard from "./Shards/PreviousExperiencesShard";
import ImageShard from "./Shards/ImageShard";
import AdminShard from "./Shards/AdminShard";
import PasswordShard from "./Shards/PasswordShard";
import MenuSuper from "./MenuBar/MenuSuper";
import MenuAdmin from "./MenuBar/MenuAdmin";
import AdminBody from "./TabBody/AdminBody";
import UserBody from "./TabBody/UserBody";
import SuperBody from "./TabBody/SuperBody";

const UpdateHomepage = ({ previousUserData, email }) => {
  const { authority } = useSelector((state) => state.userControllerReducer);
  console.log("authority: ", authority);
  console.log("authority === SUPERADMIN", authority === "SUPERADMIN");
  console.log("authority === ADMIN", authority === "ADMIN");

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header p-2">
            {email ? (
              <>
                {authority === "SUPERADMIN" ? (
                  <MenuSuper />
                ) : authority === "ADMIN" ? (
                  <MenuAdmin />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <MenuBar />
            )}
          </div>
          <div className="card-body">
            <div className="tab-content">
              {email ? (
                <>
                  {authority === "SUPERADMIN" ? (
                    <SuperBody
                      previousUserData={previousUserData}
                      email={email}
                    />
                  ) : authority === "ADMIN" ? (
                    <AdminBody
                      previousUserData={previousUserData}
                      email={email}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <UserBody previousUserData={previousUserData} email={email} />
              )}
              {/* {email ? (
                <>
                  {authority === "SUPERADMIN" ? (
                    <div className="tab-pane active" id="admin-actions">
                      <AdminShard oldData={previousUserData} email={email} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {authority === "ADMIN" ? (
                    <>
                      <div className="tab-pane active" id="admin-actions">
                        <AdminShard oldData={previousUserData} email={email} />
                      </div>
                      <div className="tab-pane" id="soft-skills">
                        <SelectionArrayShard
                          oldArrayData={previousUserData.softSkills}
                          mode="Soft Skills"
                          email={email}
                        />
                      </div>
                      <div className="tab-pane" id="office-skills">
                        <SelectionArrayShard
                          oldArrayData={previousUserData.officeSuiteSkills}
                          mode="Office Suite"
                          email={email}
                        />
                      </div>
                      <div className="tab-pane" id="hard-skills">
                        <SelectionArrayShard
                          oldArrayData={previousUserData.hardSkills}
                          mode="Dynamic"
                          email={email}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div className="tab-pane active" id="personal-informations">
                    <PersonalInfoShard
                      oldData={previousUserData}
                      email={email}
                    />
                  </div>
                  <div className="tab-pane" id="password-modification">
                    <PasswordShard />
                  </div>
                  <div className="tab-pane" id="personal-pic">
                    <ImageShard />
                  </div>
                  <div className="tab-pane" id="soft-skills">
                    <SelectionArrayShard
                      oldArrayData={previousUserData.softSkills}
                      mode="Soft Skills"
                      email={email}
                    />
                  </div>
                  <div className="tab-pane" id="office-skills">
                    <SelectionArrayShard
                      oldArrayData={previousUserData.officeSuiteSkills}
                      mode="Office Suite"
                      email={email}
                    />
                  </div>
                  <div className="tab-pane" id="hard-skills">
                    <SelectionArrayShard
                      oldArrayData={previousUserData.hardSkills}
                      mode="Dynamic"
                      email={email}
                    />
                  </div>
                  <div className="tab-pane" id="past-experiences">
                    <PreviousExperiencesShard
                      previousExperiences={previousUserData.previousExperiences}
                    />
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateHomepage;
