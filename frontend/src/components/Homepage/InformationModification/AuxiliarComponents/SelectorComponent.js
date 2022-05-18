import { useState, useEffect } from "react";

const SelectorComponent = ({ array, setSelected }) => {
  const [skill, setSkill] = useState("");
  const [proficency, setProficency] = useState("");
  const skillArray = [...array];

  const handleChange = (e) => {
    if (e.target.name === "skill") {
      setSkill(e.target.value);
    } else {
      setProficency(e.target.value);
    }
  };

  useEffect(() => {
    if (skill !== "Skill" && proficency !== "Proficency") {
      setSelected({
        skill: skill,
        proficency: proficency,
      });
    }
    return;
  }, [skill, proficency, setSelected]);

  return (
    <div
      className="row justify-content-center"
      style={{ marginBottom: "30px" }}
    >
      <label className="ml-5 btn btn-warning mr-3">Skill:</label>
      <select name="skill" className="mb-2" onChange={handleChange}>
        {skillArray.map((program) => (
          <option key={program} value={program}>
            {program}
          </option>
        ))}
      </select>
      <label className="ml-5 btn btn-warning mr-3">Proficency:</label>
      <select
        name="proficency"
        className="form-select mb-2"
        onChange={handleChange}
      >
        <option value="proficency">Proficency</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default SelectorComponent;
