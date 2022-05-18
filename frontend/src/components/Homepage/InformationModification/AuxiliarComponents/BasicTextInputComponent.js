import { useEffect, useRef } from "react";

const BasicTextInputComponent = ({
  componentLabel,
  placeholderTxt,
  setStatus,
  flushTrigger,
}) => {
  const inputRef = useRef("");

  useEffect(() => {
    if (flushTrigger) {
      inputRef.current.value = "";
    }
    return;
  }, [flushTrigger]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="col">
      <label>{componentLabel}</label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholderTxt}
        onChange={handleChange}
        ref={inputRef}
        style={{
          backgroundImage: 'url("data:image/png',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          backgroundSize: "16px 18px",
          backgroundPosition: "98% 50%",
          cursor: "auto",
        }}
        autoComplete="off"
      />
    </div>
  );
};

export default BasicTextInputComponent;
