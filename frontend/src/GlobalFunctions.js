// redux
import { changeStatus } from "./components/Redux/UserState";

const GlobalFunctions = {
  // Input control

  birthdayCheck: (day, month, year, setDate, setError) => {
    const currentDay = new Date().getFullYear();
    if (currentDay - year < 17 || currentDay - year > 80) {
      setError("!");
      return false;
    } else {
      setError("");
      setDate({ day: day, month: month, year: year });
      return true;
    }
  },

  checkInput: (role, submissible, setError, dispatcher) => {
    console.log("checkInput", submissible);
    if (role !== "admin" && role !== "user") {
      setError("!");
      if (submissible) {
        console.log("checkInput, true", submissible);
        dispatcher(changeStatus());
      }
    } else {
      setError("");
      if (!submissible) {
        console.log("checkInput, false", submissible);
        dispatcher(changeStatus());
      }
    }
  },
};

export default GlobalFunctions;
