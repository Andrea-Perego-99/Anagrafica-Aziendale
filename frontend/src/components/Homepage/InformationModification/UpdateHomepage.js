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

const UpdateHomepage = ({ previousUserData, email }) => {
  const { authority } = useSelector((state) => state.userControllerReducer);
  console.log("previousUserData: ", previousUserData);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header p-2">
            <MenuBar email={email} />
          </div>
          <div className="card-body">
            <div className="tab-content">
              {email ? (
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
                <div className="tab-pane active" id="personal-informations">
                  <PersonalInfoShard oldData={previousUserData} email={email} />
                </div>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateHomepage;
