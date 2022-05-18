import Environment from "../Environment";

const GlobalUtilities = {
  experienceAlreadyPresent: function (object, array) {
    console.log(object, array);
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (
        object.company === element.company &&
        this.dateEquals(object.beginningDate, element.startDate) &&
        this.dateEquals(object.endingDate, element.endDate)
      ) {
        return true;
      }
    }
    return false;
  },

  consultingExperienceAlreadyPresent: (object, array) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (
        object.companyConsulting === element.companyConsulting &&
        this.dateEquals(object.startDate, element.startDate) &&
        this.dateEquals(object.endDate, element.endDate)
      ) {
        return true;
      }
    }
    return false;
  },

  skillAlreadyPresent: (object, array) => {
    console.log("object.skill: ", object.skill);
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      console.log("element: ", element);
      if (object.skill === element.skill) {
        console.log("trovato!");
        return true;
      }
    }
    return false;
  },

  dateEquals: function (dateA, dateB) {
    if (
      dateA.day === dateB.day &&
      dateA.month === dateB.month &&
      dateA.year === dateB.year
    ) {
      return true;
    }
    return false;
  },

  dateSlicer: function (reference) {
    const time = reference.current.value;
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const day = time.slice(8, 10);
    return { day: day, month: month, year: year };
  },

  reverseDateSlicer: function (date) {
    console.log("date: ", date);
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);
    return { day: day, month: month, year: year };
  },

  dateComparer: (beginning, ending, setError) => {
    if (
      beginning.year === ending.year &&
      beginning.month === ending.month &&
      beginning.day >= ending.day
    ) {
      setError("!");
      console.log("error1");
      return false;
    } else if (
      beginning.year === ending.year &&
      beginning.month > ending.month
    ) {
      setError("!");
      console.log("error2");
      return false;
    } else if (beginning.year > ending.year) {
      setError("!");
      console.log("error3");
      return false;
    } else {
      setError("");
      return true;
    }
  },

  arrayMerger: (skills, proficencies) => {
    let array = [];
    let i = 0;
    skills.forEach((skill) => {
      array.push({
        skill: skill,
        proficency: proficencies[i],
      });
      i++;
    });
    return array;
  },

  getSkills: (objectArray) => {
    let array = [];
    if (objectArray !== []) {
      objectArray.forEach((element) => {
        array.push(element.skill);
      });
    }
    return array;
  },

  getProficencies: (objectArray) => {
    let array = [];
    if (objectArray !== []) {
      objectArray.forEach((element) => {
        array.push(element.proficency);
      });
    }
    return array;
  },

  stringify: (object) => {
    const array = Object.entries(object);
    let string = "";
    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        string += array[i][1];
      } else {
        string += "-" + array[i][1];
      }
    }
    return string;
  },

  reverseStringify: (object) => {
    const array = Object.entries(object);
    let string = "";
    for (let i = array.length - 1; i >= 0; i--) {
      if (i === array.length - 1) {
        string += array[i][1];
      } else {
        string += "-" + array[i][1];
      }
    }
    console.log("reverseStringify: ", string);
    return string;
  },

  backendDataProcessing: function (user) {
    let cleanUser = Environment.defaultUser;
    if (user.email) {
      cleanUser.email = user.email;
    } else {
      cleanUser.email = "";
    }
    if (user.name) {
      cleanUser.name = user.name;
    } else {
      cleanUser.name = "";
    }
    if (user.surname) {
      cleanUser.surname = user.surname;
    } else {
      cleanUser.surname = "";
    }
    if (user.address) {
      let spacer = user.address.indexOf(",");
      console.log("spacer: ", spacer);
      if (spacer !== -1) {
        const address = user.address.substring(0, spacer);
        const postalCode = user.address.substring(
          spacer + 2,
          user.address.length
        );
        cleanUser.address = address;
        cleanUser.postalCode = postalCode;
      } else {
        cleanUser.address = user.address;
        cleanUser.postalCode = "";
      }
    } else {
      cleanUser.address = "";
      cleanUser.postalCode = "";
    }
    if (user.cityName) {
      cleanUser.city = user.cityName;
    } else {
      cleanUser.city = "";
    }
    if (user.cellPhone) {
      cleanUser.telephoneNumber = user.cellPhone;
    } else {
      cleanUser.telephoneNumber = "";
    }
    if (user.birthDay) {
      console.log("user.birthDay: ", user.birthDay);
      cleanUser.birthday = this.reverseDateSlicer(user.birthDay);
    } else {
      cleanUser.birthday = Environment.epoch;
    }
    if (user.experience) {
      const array = [];
      user.experience.forEach((experience) => {
        array.push({
          company: experience.company,
          startDate: this.reverseDateSlicer(experience.startDate),
          endDate: this.reverseDateSlicer(experience.endDate),
          position: experience.position,
          description: experience.description ? experience.description : "",
          companyConsulting: experience.companyConsulting
            ? experience.companyConsulting
            : "",
        });
      });
      console.log("array: ", array);
      cleanUser.previousExperiences = array;
    } else {
      cleanUser.previousExperiences = [];
    }
    if (user.hardSkill) {
      const tmp = [];
      user.hardSkill.forEach((skill) => {
        tmp.push({
          skill: skill.hardSkill.name,
          proficency: skill.level,
        });
      });
      cleanUser.hardSkills = tmp;
    } else {
      cleanUser.hardSkills = [];
    }
    if (user.softSkill) {
      const tmp = [];
      user.softSkill.forEach((skill) => {
        tmp.push({
          skill: skill.softSkill.name,
          proficency: skill.level,
        });
      });
      cleanUser.softSkills = tmp;
    } else {
      cleanUser.softSkills = [];
    }
    if (user.officeSuites) {
      const tmp = [];
      user.officeSuites.forEach((skill) => {
        tmp.push({
          skill: skill.officeSuite.name,
          proficency: skill.level,
        });
      });
      console.log("tmp: ", tmp);
      cleanUser.officeSuiteSkills = tmp;
    } else {
      cleanUser.officeSuiteSkills = [];
    }
    if (user.posizione) {
      cleanUser.position = user.posizione;
    } else {
      cleanUser.position = "";
    }
    if (user.authority) {
      cleanUser.authority = user.authority;
    } else {
      cleanUser.authority = "user";
    }
    if (user.salary) {
      cleanUser.salary = user.salary;
    } else {
      cleanUser.salary = 0;
    }
    if (user.enable) {
      cleanUser.enable = user.enable;
    } else {
      cleanUser.enable = true;
    }
    return cleanUser;
  },

  experienceEquals: function (experienceA, experienceB) {
    if (
      experienceA.company === experienceB.company &&
      this.dateEquals(experienceA.startDate, experienceB.startDate) &&
      this.dateEquals(experienceA.endDate, experienceB.endDate) &&
      experienceA.companyConsulting === experienceB.companyConsulting &&
      experienceA.description === experienceB.description &&
      experienceA.position === experienceB.position
    ) {
      return true;
    }
    return false;
  },

  passwordFilter: (password, setColor, setMessage) => {
    let numbers = 0;
    let cLetters = 0;
    let mLetters = 0;
    if (password.length < 8 || password.length > 16) {
      console.log("lunghezza sbagliata");
      return false;
    }
    for (let i = 0; i < password.length; i++) {
      console.log(password[i], password[i].charCodeAt(0));
      // E' una lettera maiuscola
      if (65 >= password[i].charCodeAt(0) && password[i].charCodeAt(0) <= 90) {
        cLetters++;
      }
      // E' una lettera minuscola
      if (97 >= password[i].charCodeAt(0) && password[i].charCodeAt(0) <= 122) {
        mLetters++;
      }
      // E' un numero
      if (48 >= password[i].charCodeAt(0) && password[i].charCodeAt(0) <= 57) {
        numbers++;
      }
    }
    console.log(cLetters, mLetters, numbers);
    if (cLetters >= 1 && mLetters >= 1 && numbers >= 1) {
      console.log("password ok");
      return true;
    } else {
      setColor("red");
      setMessage("Errore");
      return false;
    }
  },
};

export default GlobalUtilities;
