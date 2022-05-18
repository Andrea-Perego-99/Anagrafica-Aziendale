import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import { imageReducer } from "../../../Redux/UserState";

const ImageShard = () => {
  const [picture, setPicture] = useState({});
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.userControllerReducer);
  const dispatcher = useDispatch();

  const uploadPicture = (e) => {
    setPicture({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.pictureAsFile);

    fetch("http://localhost:8080/control/person/image", {
      method: "post",
      headers: { Authorization: token },
      body: formData,
    }).then((res) => {
      console.log("risultato img: ", res.status);
      if (res.status === 200) {
        GlobalCommunications.getImage(token, dispatcher, setColor, setMessage);
      }
    });
  };

  return (
    <div className="content landing">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <button type="submit" name="upload" className="btn btn-info">
          UPLOAD
        </button>
        <br />
        <label className="mt-3" style={{ color: color }}>
          {message}
        </label>
      </form>
    </div>
  );
};

export default ImageShard;
