import { Wrapper } from "../../InformationModification/MenuBar/Style";

const MenuBar = () => {
  return (
    <Wrapper>
      <ul className="d-flex justify-content-center nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" href="#all-users" data-toggle="tab">
            SHOW ALL USERS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#all-skills" data-toggle="tab">
            SHOW ALL SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#search-user" data-toggle="tab">
            SEARCH USER
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#add-user" data-toggle="tab">
            ADD USER
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};
export default MenuBar;
