import PDFBoilerPlate from "./PDFBoilerPlate";
import { PDFViewer } from "@react-pdf/renderer";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";

const PDFVisualizer = ({ user }) => (
  <>
    <PDFViewer style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <PDFBoilerPlate user={user} />
    </PDFViewer>
  </>
);

export default PDFVisualizer;
