import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";

const DynamicFormComponent = ({ skillArray, skillArraySetter, email }) => {
  const skillName = useRef(null);
  const proficency = useRef(null);
  const dispatcher = useDispatch();
  const { token } = useSelector((state) => state.userControllerReducer);

  const handleClick = () => {
    // Controllo se il linguaggio inserito e' gia' presente all'interno dell'array
    if (
      !GlobalUtilities.skillAlreadyPresent(
        {
          skill: skillName.current.value,
        },
        skillArray
      ) &&
      skillName.current.value != ""
    ) {
      skillArraySetter([
        ...skillArray,
        {
          skill: skillName.current.value,
          proficency: proficency.current.value,
        },
      ]);
    } else {
      console.log("errore durante l'inserimento dell'elemento");
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
    if (!email) {
      GlobalCommunications.removeHardSkill(
        token,
        elementToBeDealtWith,
        array,
        dispatcher
      );
    } else {
      GlobalCommunications.removeHardSkill(
        token,
        elementToBeDealtWith,
        array,
        dispatcher,
        email
      );
    }
    skillArraySetter([...array]);
  };

  return (
    <div className="form-group">
      <h3>Hard Skills</h3>
      <label>
        Inserire delle skill relative all'ambito della programmazione e dei
        framework
      </label>
      <div className="row">
        <input
          type="text"
          className="form-control"
          placeholder="Inserire una hard skill"
          ref={skillName}
          style={{
            backgroundImage: 'url("data:image/png',
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            backgroundSize: "16px 18px",
            backgroundPosition: "98% 50%",
            cursor: "auto",
            width: "400px",
          }}
          autoComplete="off"
        />
        <select
          name="proficency"
          ref={proficency}
          className="btn btn-outline-info"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          onClick={handleClick}
          id="adder"
          className="btn btn-outline-info"
        >
          add
        </button>
      </div>
      <div className="form-group">
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
                <tbody key={element.skill}>
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
    </div>
  );
};

export default DynamicFormComponent;
