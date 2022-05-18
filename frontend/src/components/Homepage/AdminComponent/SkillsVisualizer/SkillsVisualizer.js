import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";

const SkillsVisualizer = () => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);

  const removeHardSkill = (e) => {
    GlobalCommunications.deleteSkill(
      token,
      e.target.id,
      setHardSkills,
      setSoftSkills
    );
  };

  return (
    <>
      <button
        className="btn btn-info"
        onClick={(e) => {
          GlobalCommunications.getAllHardSkills(
            token,
            setSoftSkills,
            setHardSkills
          );
        }}
      >
        GET SKILLS
      </button>
      <br />
      <div>
        <table className="table table-borderless mt-3">
          <thead
            className="thead-light"
            style={{ border: "1px solid white", borderRadius: "20px" }}
          >
            <tr>
              <th scope="col">
                <h2>Hard skills</h2>
              </th>
              <th scope="col">
                <h2>Delete Button</h2>
              </th>
            </tr>
          </thead>
          {hardSkills ? (
            hardSkills.map((element) => {
              return (
                <tbody key={element.name}>
                  <tr>
                    <td>
                      <h5>{element.name}</h5>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={removeHardSkill}
                        id={element.name}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <></>
          )}
        </table>
      </div>
      <div>
        <table className="table table-borderless mt-3">
          <thead
            className="thead-light"
            style={{ border: "1px solid white", borderRadius: "20px" }}
          >
            <tr>
              <th scope="col">
                <h2>Soft skills</h2>
              </th>
            </tr>
          </thead>
          {softSkills ? (
            softSkills.map((element) => {
              return (
                <tbody key={element.name}>
                  <tr>
                    <td>
                      <h5>{element.name}</h5>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <></>
          )}
        </table>
      </div>
    </>
  );
};

export default SkillsVisualizer;
