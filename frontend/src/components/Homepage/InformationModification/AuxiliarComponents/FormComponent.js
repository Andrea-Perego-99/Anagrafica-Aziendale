import { useEffect, useState, useRef } from "react";
// Global Functions
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
// Components
import SelectorComponent from "./SelectorComponent";
import { useSelector, useDispatch } from "react-redux";

const baseSelectionState = {
  skill: "",
  proficency: "",
};

const FormComponent = ({
  array,
  title,
  skillArray,
  skillArraySetter,
  email,
}) => {
  const skillBranch = title;
  const adder = useRef(null);
  const [entries, setEntries] = useState(skillArray.length);
  const [selectionState, setSelectionState] = useState(baseSelectionState);
  const { token } = useSelector((state) => state.userControllerReducer);
  const dispatcher = useDispatch();

  const addSkill = () => {
    console.log(selectionState);
    if (selectionState.skill !== "" && selectionState.proficency !== "") {
      if (!GlobalUtilities.skillAlreadyPresent(selectionState, skillArray)) {
        setEntries(entries + 1);
        const newSkill = {
          skill: selectionState.skill,
          proficency: selectionState.proficency,
        };
        skillArraySetter([...skillArray, newSkill]);
      } else {
        console.log("error during insertion");
      }
    }
    return;
  };

  const removeSkill = (e) => {
    let array = [...skillArray];
    const elementToBeDealtWith = JSON.parse(e.target.id);
    console.log("elementToBeDealtWith: ", elementToBeDealtWith);
    for (let pos = 0, flag = false; !flag && pos < array.length; pos++) {
      if (array[pos].skill === elementToBeDealtWith.skill) {
        array.splice(pos, 1);
        flag = true;
      }
    }
    console.log("array: ", array);
    skillArraySetter([...array]);
    if (title === "Office Suite") {
      GlobalCommunications.removeOfficeSkill(
        token,
        elementToBeDealtWith,
        array,
        dispatcher,
        email
      );
    } else {
      GlobalCommunications.removeSoftSkill(
        token,
        elementToBeDealtWith,
        array,
        dispatcher,
        email
      );
    }
  };

  return (
    <div className="form-group">
      <label>
        <h3>{skillBranch}</h3>
      </label>
      <br></br>
      {title === "Soft Skills" ? (
        <label>Inserire delle soft skill</label>
      ) : (
        <label>Inserire delle skill per programmi della suite office</label>
      )}
      <SelectorComponent
        array={array}
        selected={selectionState}
        setSelected={setSelectionState}
      />
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-info mr-3" ref={adder} onClick={addSkill}>
          Add more
        </button>
      </div>
      <table className="table table-borderless mt-3">
        <thead
          className="thead-light"
          style={{ border: "1px solid white", borderRadius: "20px" }}
        >
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Level</th>
            <th scope="col">Delete Button</th>
          </tr>
        </thead>
        {skillArray ? (
          skillArray.map((element) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <h5>{element.skill}</h5>
                  </td>
                  <td>
                    <h5>{element.proficency}</h5>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      id={JSON.stringify({
                        skill: element.skill,
                        proficency: element.proficency,
                      })}
                      onClick={removeSkill}
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
  );
};

export default FormComponent;
