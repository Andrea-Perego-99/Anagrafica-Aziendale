// Redux
import { useSelector } from "react-redux";
// Components
import PDFVisualizer from "./PDFBoilerPlate/PDFVisualizer";

const PdfGenerator = () => {
  const user = useSelector((state) => state.userControllerReducer);

  return (
    <>
      <PDFVisualizer
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
        user={user}
      />
    </>
  );
};

export default PdfGenerator;
