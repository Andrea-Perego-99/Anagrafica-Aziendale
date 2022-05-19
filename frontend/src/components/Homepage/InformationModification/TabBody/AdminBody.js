import SelectionArrayShard from "../Shards/SelectionArrayShard";
import AdminShard from "../Shards/AdminShard";

const AdminBody = ({ previousUserData, email }) => {
  return (
    <>
      <div className="tab-pane active" id="admin-actions">
        <AdminShard oldData={previousUserData} email={email} />
      </div>
      <div className="tab-pane" id="admin-soft-skills">
        <SelectionArrayShard
          oldArrayData={previousUserData.softSkills}
          mode="Soft Skills"
          email={email}
        />
      </div>
      <div className="tab-pane" id="admin-office-skills">
        <SelectionArrayShard
          oldArrayData={previousUserData.officeSuiteSkills}
          mode="Office Suite"
          email={email}
        />
      </div>
      <div className="tab-pane" id="admin-hard-skills">
        <SelectionArrayShard
          oldArrayData={previousUserData.hardSkills}
          mode="Dynamic"
          email={email}
        />
      </div>
    </>
  );
};

export default AdminBody;
