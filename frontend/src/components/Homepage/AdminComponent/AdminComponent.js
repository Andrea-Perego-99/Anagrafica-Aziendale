import MenuBar from "./MenuBar/MenuBar";
import AllUsersView from "./AllUsersView/AllUsersView";
import NewUserView from "./NewUserView/NewUserView";
import SearchComponent from "./SearchComponent/SearchComponent";
import SkillsVisualizer from "./SkillsVisualizer/SkillsVisualizer";

const AdminComponent = () => {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header p-2">
            <MenuBar />
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="all-users">
                <AllUsersView />
              </div>
              <div className="tab-pane" id="all-skills">
                <SkillsVisualizer />
              </div>
              <div className="tab-pane" id="search-user">
                <SearchComponent />
              </div>
              <div className="tab-pane" id="add-user">
                <NewUserView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminComponent;
