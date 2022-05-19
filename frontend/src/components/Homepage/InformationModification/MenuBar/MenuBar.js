// Style
import { Wrapper } from "./Style";

const MenuBar = () => {
  return (
    <Wrapper>
      <ul className="d-flex justify-content-center nav nav-pills">
        <li className="nav-item">
          <a
            className="nav-link active"
            href="#personal-informations"
            data-toggle="tab"
          >
            PERSONAL INFO
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            href="#password-modification"
            data-toggle="tab"
          >
            CHANGE PASSWORD
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#personal-pic" data-toggle="tab">
            PROFILE PIC
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#soft-skills" data-toggle="tab">
            SOFT SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#office-skills" data-toggle="tab">
            OFFICE SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#hard-skills" data-toggle="tab">
            HARD SKILLS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#past-experiences" data-toggle="tab">
            PREVIOUS EXPERIENCES
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default MenuBar;
