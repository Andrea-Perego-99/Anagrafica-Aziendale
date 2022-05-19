import { Wrapper } from "./Style";

const MenuSuper = () => {
  return (
    <Wrapper>
      <ul className="d-flex justify-content-center nav nav-pills">
        <li className="nav-item">
          <a
            className="nav-link active"
            href="#super-admin-actions"
            data-toggle="tab"
          >
            ADMIN MODIFICATIONS
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default MenuSuper;
