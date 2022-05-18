const ExperienceComponent = ({
  company,
  position,
  firstDay,
  lastDay,
  experienceSummary,
}) => {
  return (
    <div className="p-2">
      <div className="d-flex justify-content-around align-items-baseline">
        <div className="row">
          <label>Azienda: {company}</label>
        </div>
        <div className="row">
          <label>Impiego: {position}</label>
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-baseline">
        <div className="row">
          <label>
            Giorno di inizio:{" "}
            {firstDay.day + "/" + firstDay.month + "/" + firstDay.year}
          </label>
        </div>
        <div className="row">
          <label>
            Giorno di fine:{" "}
            {lastDay.day + "/" + lastDay.month + "/" + lastDay.year}
          </label>
        </div>
      </div>
      {experienceSummary ? (
        <p className="m-4" style={{ fontStyle: "italic" }}>
          {experienceSummary}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ExperienceComponent;
