import { Wrapper } from "./Style";

const MenuAdmin = () => {
  return (
    <Wrapper>
      <ul className="d-flex justify-content-center nav nav-pills">
        <li className="nav-item">
          <a
            className="nav-link active"
            href="#admin-actions"
            data-toggle="tab"
          >
            ADMIN MODIFICATIONS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#admin-soft-skills" data-toggle="tab">
            SOFT SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            href="#admin-office-skills"
            data-toggle="tab"
          >
            OFFICE SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#admin-hard-skills" data-toggle="tab">
            HARD SKILLS
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default MenuAdmin;
