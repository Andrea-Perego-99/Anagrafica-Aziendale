import Header from "../Header/Header";
import HomepageComponent from "./HomepageComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../Footer/Footer";

const Homepage = () => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const dispatcher = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!token) {
  //     history.replace("/");
  //   }
  //   return;
  // }, [token]);

  return (
    <>
      <Header />
      <HomepageComponent />
      <Footer />
    </>
  );
};

export default Homepage;
