const MenuBar = ({ authority }) => (
  <ul className="nav nav-pills">
    <li className="nav-item">
      <a className="nav-link active" href="#visual" data-toggle="tab">
        SKILLS
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#experiences" data-toggle="tab">
        EXPERIENCES
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#pdf" data-toggle="tab">
        PDF
      </a>
    </li>
    {authority === "admin" || authority === "SUPERADMIN" ? (
      <>
        <li className="nav-item">
          <a className="nav-link" href="#search" data-toggle="tab">
            SEARCH
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#view-all" data-toggle="tab">
            ALL USERS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#new-user" data-toggle="tab">
            ADD USER
          </a>
        </li>
      </>
    ) : (
      <></>
    )}
    <li className="nav-item">
      <a className="nav-link" href="#settings" data-toggle="tab">
        UPDATE
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#logout" data-toggle="tab">
        LOGOUT
      </a>
    </li>
  </ul>
);

export default MenuBar;
