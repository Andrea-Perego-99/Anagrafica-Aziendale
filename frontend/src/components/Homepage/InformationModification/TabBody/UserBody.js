import PersonalInfoShard from "../Shards/PersonalInfoShard";
import PasswordShard from "../Shards/PasswordShard";
import ImageShard from "../Shards/ImageShard";
import SelectionArrayShard from "../Shards/SelectionArrayShard";
import PreviousExperiencesShard from "../Shards/PreviousExperiencesShard";

const UserBody = ({ previousUserData, email }) => {
  return (
    <>
      <div className="tab-pane active" id="personal-informations">
        <PersonalInfoShard oldData={previousUserData} email={email} />
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
  );
};

export default UserBody;
