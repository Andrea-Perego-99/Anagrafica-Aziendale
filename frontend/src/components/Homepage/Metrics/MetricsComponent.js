const MetricsComponent = ({
  title,
  firstCol,
  secondCol,
  skillPercentages,
  color,
}) => {
  return (
    <>
      <br />
      <h3>{title}</h3>
      <br />
      <table className="table  table-bordered">
        <thead>
          <tr>
            <th className="col-md-5">{firstCol}</th>
            <th className="col-md-5">{secondCol}</th>
          </tr>
        </thead>
        <tbody>
          {skillPercentages.map((skill) => {
            return (
              <tr key={skill.name}>
                <td>{skill.name}</td>
                <td>
                  <div className="progress progress-xs">
                    <div
                      className={"progress-bar bg-warning bg-" + color}
                      style={{
                        width: skill.percentage,
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MetricsComponent;
