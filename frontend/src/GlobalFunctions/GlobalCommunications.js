import {
  hardSkillsReducer,
  login,
  officeSkillsReducer,
  personalInfoReducer,
  softSkillsReducer,
  experiencesReducer,
  updateAllUserInformations,
  imageReducer,
} from "../components/Redux/UserState";
import GlobalUtilities from "./GlobalUtilities";

const GlobalCommunications = {
  securityRegistration: async (email, token, setColor, setError, textRef) => {
    const user = { email: email, password: "1234" };
    const response = await fetch(
      "http://localhost:8080/security/registration",
      {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(user),
      }
    );
    console.log("security registration:", response.status);
    if (response.status === 200) {
      textRef.current.value = "";
      setError("L'utente " + email + " è stato inserito correttamente");
      setColor("green");
      return true;
    } else {
      setError("Incapace di fare la fetch richiesta");
      setColor("red");
      return false;
    }
  },

  registrationProcedure: async (password, birthday, token, history) => {
    console.log(token);
    console.log(
      JSON.stringify({
        password: password,
        birthday: GlobalUtilities.stringify(birthday),
      })
    );
    fetch("http://localhost:8080/security/verify", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        code: token,
      },
      body: JSON.stringify({
        password: password,
        birthday: GlobalUtilities.reverseStringify(birthday),
      }),
    }).then((res) => {
      console.log("registrationProcedure: ", res.status);
      if (res.status === 200) {
        history.replace("/");
        return true;
      } else {
        return false;
      }
    });
  },

  login: async function (
    email,
    password,
    dispatcher,
    history,
    setMessage,
    setColor
  ) {
    fetch("http://localhost:8080/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      console.log("login:", res.status);
      if (res.status === 200) {
        console.log("res: ", res);
        const token = res.headers.get("Authorization");
        console.log("token: ", token);
        dispatcher(login({ token: token, email: email }));
        this.getUserData(token, dispatcher, history);
        this.getImage(token, dispatcher);
        history.replace("/home");
        return true;
      } else {
        setMessage("L'utente è disabilitato o le credenziali sono errate");
        setColor("red");
        return false;
      }
    });
  },

  getUserData: async function (token, dispatcher, history) {
    fetch("http://localhost:8080/control/person", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }).then((res) => {
      console.log("getUserData:", res.status);
      if (res.status === 200) {
        res.json().then((json) => {
          console.log("user: ", json);
          dispatcher(updateAllUserInformations({ user: json }));
          return true;
        });
      } else {
        history.replace("/");
        return false;
      }
    });
  },

  getUserByEmail: async (email, token, setter, setMessage, setColor) => {
    fetch("http://localhost:8080/control/admin/userById", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ email: email }),
    }).then((res) => {
      console.log("getUserByEmail:", res.status);
      if (res.status === 200) {
        res.json().then((json) => {
          const user = GlobalUtilities.backendDataProcessing(json);
          console.log("user: ", user);
          setter(user);
          if (setMessage && setColor) {
            setMessage("La ricerca è stata completata con successo");
            setColor("green");
          }
          return true;
        });
      } else {
        setMessage(
          "Non è stato identificato alcun utente che corrisponde ai criteri di ricerca"
        );
        setColor("red");
        return false;
      }
    });
  },

  modifyUserAttributes: async function (token, url, attributes, email) {
    if (attributes.authority !== "USER" && attributes.authority !== "ADMIN") {
      return false;
    } else {
      fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          email: email,
          salary: +attributes.salary,
          authority: attributes.authority,
          posizione: attributes.position,
        }),
      }).then((res) => {
        console.log("modifyUserAttributes: ", res.status);
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
    }
  },

  addPersonalData: async function (
    token,
    personalData,
    dispatcher,
    email,
    setMessage,
    setColor,
    setFlushTrigger
  ) {
    console.log("personalData: ", personalData);
    if (!email) {
      fetch("http://localhost:8080/control/person", {
        mode: "cors",
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          cellPhone: personalData.telephoneNumber,
          address: personalData.address + ", " + personalData.postalCode,
          cityName: personalData.city,
          birthDay: GlobalUtilities.stringify(personalData.birthday),
        }),
      }).then((res) => {
        console.log("addUserData:", res.status);
        if (res.status === 200) {
          dispatcher(
            personalInfoReducer({
              telephoneNumber: personalData.telephoneNumber,
              address: personalData.address,
              postalCode: personalData.postalCode,
              city: personalData.city,
              birthday: personalData.birthday,
            })
          );
          setMessage(
            "Le informazioni dell'utente sono state aggiornate correttamente"
          );
          setColor("green");
          setFlushTrigger(true);
          return true;
        } else {
          setMessage(
            "C'è stato un errore durante l'invio dei dati, riprovare più tardi"
          );
          setColor("red");
          return false;
        }
      });
    } else {
      return this.modifyPersonalData(token, personalData, email);
    }
  },

  removeHardSkill: async function (token, hardSkill, array, dispatcher, email) {
    if (!email) {
      fetch("http://localhost:8080/control/person/hardskill", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: hardSkill.skill,
          level: hardSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeHardSkill:", res.status);
        if (res.status === 200) {
          dispatcher(hardSkillsReducer({ hardSkills: array }));
          return true;
        } else {
          return false;
        }
      });
    } else {
      fetch("http://localhost:8080/control/admin/hardskill", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          user: email,
        },
        body: JSON.stringify({
          name: hardSkill.skill,
          level: hardSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeHardSkill:", res.status);
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
    }
  },

  modifyHardSkill: async function (token, hardSkills, email) {
    fetch("http://localhost:8080/control/admin/hardskill", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user: email,
      },
      body: JSON.stringify(hardSkills),
    }).then((res) => {
      console.log("modifyHardSkill:", res.status);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  },

  addHardSkill: async function (
    token,
    hardSkills,
    dispatcher,
    email,
    setColor,
    setMessage
  ) {
    let array = [];
    hardSkills.forEach((element) => {
      array.push({ name: element.skill, level: element.proficency });
    });
    console.log("array: ", array);
    if (!email) {
      fetch("http://localhost:8080/control/person/hardskill", {
        mode: "cors",
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(array),
      }).then((res) => {
        console.log("addHardSkill:", res.status);
        if (res.status === 200) {
          console.log("hardSkills: ", hardSkills);
          dispatcher(hardSkillsReducer({ hardSkills: hardSkills }));
          setMessage(
            "Le hard Skill dell'utente sono state inserite con successo"
          );
          setColor("green");
          return true;
        } else {
          setMessage(
            "Si è verificato un problema durante l'aggiornamento dei dati, riprovare più tardi"
          );
          setColor("red");
          return false;
        }
      });
    } else {
      return this.modifyHardSkill(token, array, email);
    }
  },

  removeSoftSkill: async function (token, softSkill, array, dispatcher, email) {
    if (!email) {
      fetch("http://localhost:8080/control/person/softskill", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: softSkill.skill,
          level: softSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeSoftSkill:", res.status);
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      fetch("http://localhost:8080/control/admin/softskill", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          user: email,
        },
        body: JSON.stringify({
          name: softSkill.skill,
          level: softSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeSoftSkill:", res.status);
        if (res.status === 200) {
          dispatcher(softSkillsReducer({ softSkills: array }));
          return true;
        } else {
          return false;
        }
      });
    }
  },

  modifySoftSkill: async function (token, softSkills, email) {
    console.log("softSkills: ", softSkills);
    fetch("http://localhost:8080/control/admin/softskill", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user: email,
      },
      body: JSON.stringify(softSkills),
    }).then((res) => {
      console.log("modifySoftSkill:", res.status);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  },

  addSoftSkill: async function (
    token,
    softSkills,
    dispatcher,
    email,
    setColor,
    setMessage
  ) {
    let array = [];
    softSkills.forEach((softSkill) => {
      array.push({ name: softSkill.skill, level: softSkill.proficency });
    });
    if (!email) {
      fetch("http://localhost:8080/control/person/softskill", {
        mode: "cors",
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(array),
      }).then((res) => {
        console.log("addSoftSkill:", res.status);
        if (res.status === 200) {
          dispatcher(
            softSkillsReducer({
              softSkills: softSkills,
            })
          );
          setMessage(
            "Le soft skill dell'utente sono state inserite con successo"
          );
          setColor("green");
          return true;
        } else {
          setMessage(
            "Si è verificato un problema durante l'aggiornamento dei dati, rirovare più tardi"
          );
          setColor("red");
          return false;
        }
      });
    } else {
      return this.modifySoftSkill(token, array, email);
    }
  },

  removeOfficeSkill: async function (
    token,
    officeSkill,
    array,
    dispatcher,
    email
  ) {
    if (!email) {
      fetch("http://gateway:8080/control/person/officesuite", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: officeSkill.skill,
          level: officeSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeOfficeSkill:", res.status);
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      fetch("http://localhost:8080/control/admin/officesuite", {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          user: email,
        },
        body: JSON.stringify({
          name: officeSkill.skill,
          level: officeSkill.proficency,
        }),
      }).then((res) => {
        console.log("removeOfficeSkill:", res.status);
        if (res.status === 200) {
          dispatcher(officeSkillsReducer({ officeSuiteSkills: array }));
          return true;
        } else {
          return false;
        }
      });
    }
  },

  modifyOfficeSkill: async function (token, officeSkills, email) {
    fetch("http://localhost:8080/control/admin/officesuite", {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user: email,
      },
      body: JSON.stringify(officeSkills),
    }).then((res) => {
      console.log("addOfficeSkill:", res.status);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  },

  addOfficeSkill: async function (
    token,
    officeSkills,
    dispatcher,
    email,
    setColor,
    setMessage
  ) {
    let array = [];
    officeSkills.forEach((officeSkill) => {
      array.push({ name: officeSkill.skill, level: officeSkill.proficency });
    });
    if (!email) {
      fetch("http://localhost:8080/control/person/officesuite", {
        mode: "cors",
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(array),
      }).then((res) => {
        console.log("addOfficeSkill:", res.status);
        if (res.status === 200) {
          dispatcher(
            officeSkillsReducer({
              officeSuiteSkills: officeSkills,
            })
          );
          setMessage(
            "Le skill di Office dell'utente sono state inserite con successo"
          );
          setColor("green");
          return true;
        } else {
          setMessage(
            "Si è verificato un problema durante l'aggiornamento dei dati, rirovare più tardi"
          );
          setColor("red");
          return false;
        }
      });
    } else {
      return this.modifyOfficeSkill(token, array, email);
    }
  },

  getAllUsers: async function (token, setter, setColor, setMessage) {
    fetch("http://localhost:8080/control/admin/all", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }).then((res) => {
      console.log("getAllUsers:", res.status);
      if (res.status === 200) {
        if (setMessage && setColor) {
          setMessage("Tutti gli utenti sono stati recuperati");
          setColor("green");
        }
        res.json().then((json) => {
          if (setter) {
            setter(json);
          }
          return true;
        });
      } else {
        if (setMessage && setColor) {
          setColor("red");
          setMessage("Non è stato possibile recuperare gli utenti");
        }
        return false;
      }
    });
  },

  deleteUser: async function (url, token, email, setClicked, setUsers) {
    fetch(url, {
      mode: "cors",
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ email: email }),
    }).then((res) => {
      console.log("deleteUser", res.status);
      if (res.status === 200) {
        setClicked(false);
        this.getAllUsers(token, setUsers);
        return true;
      } else {
        return false;
      }
    });
  },

  addExperiences: (token, experiences, dispatcher, setMessage, setColor) => {
    let array = [];
    experiences.forEach((experience) => {
      array.push({
        company: experience.company,
        startDate: GlobalUtilities.stringify(experience.startDate),
        endDate: GlobalUtilities.stringify(experience.endDate),
        companyConsulting: experience.companyConsulting,
        description: experience.description,
        position: experience.position,
      });
    });
    fetch("http://localhost:8080/control/person/experience", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(array),
    }).then((res) => {
      console.log("addExperiences: ", res.status);
      if (res.status === 200) {
        dispatcher(experiencesReducer({ experiences: experiences }));
        setColor("green");
        setMessage(
          "Le esperienze dell'utente sono state caricate con successo"
        );
        return true;
      } else {
        setColor("red");
        setMessage(
          "C'è stato un problema durante il caricamento delle esperienze pregresse, riprovare più tardi"
        );
        return false;
      }
    });
  },

  deleteExperience: async (token, experience, dispatcher, array) => {
    console.log("experience: ", experience);
    fetch("http://localhost:8080/control/person/experience", {
      mode: "cors",
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        company: experience.company,
        startDate: GlobalUtilities.stringify(experience.startDate),
        endDate: GlobalUtilities.stringify(experience.endDate),
        companyConsulting: experience.companyConsulting,
        descrtiption: experience.description,
        position: experience.position,
      }),
    }).then((res) => {
      console.log("deleteExperience: ", res.status);
      if (res.status === 200) {
        console.log("tf1");
        dispatcher(experiencesReducer({ experiences: array }));
        console.log("tf2");
        return true;
      } else {
        return false;
      }
    });
  },

  getAllHardSkills: async function (token, setSoftSkills, setHardSkills) {
    fetch("http://localhost:8080/control/admin/hardskill", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }).then((res) => {
      console.log("getAllHardSkills: ", res.status);
      if (res.status === 200) {
        res.json().then((jsonResponse) => {
          console.log("skillList: ", jsonResponse);
          setHardSkills(jsonResponse);
          return true;
        });
      } else {
        return false;
      }
    });
    fetch("http://localhost:8080/control/admin/softskill", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }).then((res) => {
      console.log("getAllSoftSkills: ", res.status);
      if (res.status === 200) {
        res.json().then((jsonResponse) => {
          console.log("skillList: ", jsonResponse);
          setSoftSkills(jsonResponse);
          return true;
        });
      } else {
        return false;
      }
    });
  },

  getImage: async function (token, dispatcher, setColor, setMessage, setImage) {
    fetch("http://localhost:8080/control/person/image", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          console.log(json);
          if (dispatcher) {
            dispatcher(
              imageReducer({ image: "data:image/png;base64," + json.image })
            );
          } else {
            setImage("data:image/png;base64," + json.image);
          }
        });
        if (setColor && setMessage) {
          setColor("green");
          setMessage("L'immagine è stata aggiornata correttamente");
        }
      } else {
        if (setColor && setMessage) {
          setColor("red");
          setMessage(
            "Non è stato possibile aggiornare l'immagine, riprovare più tardi"
          );
        }
      }
    });
  },

  changeUserStatus: async function (url, token, email, newValue, setUsers) {
    fetch(url, {
      mode: "cors",
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ email: email, enable: newValue }),
    }).then((res) => {
      console.log("changeUserStatus: ", res.status);
      if (res.status === 200) {
        this.getAllUsers(token, setUsers);
        return true;
      } else {
        return false;
      }
    });
  },

  modifyPassword: async (token, newPassword, setMessage, setColor) => {
    fetch("http://localhost:8080/securityU/password", {
      mode: "cors",
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ password: newPassword }),
    }).then((res) => {
      console.log("modifyPassword: ", res.status);
      if (res.status === 200) {
        setColor("green");
        setMessage("La password è stata modificata con successo");
        return true;
      } else {
        setColor("red");
        setMessage("C'è stato un errore durante la modifica della password");
        return false;
      }
    });
  },
};

export default GlobalCommunications;
