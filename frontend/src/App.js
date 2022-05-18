// React router
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Components
import Login from "./components/Login/Login";
import PdfGenerator from "./components/Homepage/PdfGenerator/PdfGenerator";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/home/cv" component={PdfGenerator} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
