const SimpleDateComponent = ({ title, error, dateRef }) => {
  return (
    <div className="form-group">
      <label>{title}</label>
      <div className="form-group">
        <div className="d-flex justify-content-around align-items-baseline">
          <h5 style={{ color: "red" }} className="mr-2">
            {error}
          </h5>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-calendar-alt" />
              </span>
            </div>
            <input
              type="date"
              className="form-control"
              data-inputmask-alias="datetime"
              data-inputmask-inputformat="dd/mm/yyyy"
              data-mask
              inputMode="numeric"
              placeholder="dd/mm/yyyy"
              ref={dateRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDateComponent;
