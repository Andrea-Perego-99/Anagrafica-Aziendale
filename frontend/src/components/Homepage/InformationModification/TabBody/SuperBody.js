import AdminShard from "../Shards/AdminShard";
const SuperBody = ({ previousUserData, email }) => {
  return (
    <div className="tab-pane active" id="super-admin-actions">
      <AdminShard oldData={previousUserData} email={email} />
    </div>
  );
};

export default SuperBody;
