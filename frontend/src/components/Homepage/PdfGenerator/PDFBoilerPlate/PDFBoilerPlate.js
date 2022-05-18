import React from "react";
// Images
import logo from "../../../../images/logo.png";
// React-pdf
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
// Fonts
import SyncopateBold from "./fonts/Syncopate-Bold.ttf";
import RobotoLight from "./fonts/Roboto-Light.ttf";
import RobotoMedium from "./fonts/Roboto-Medium.ttf";
import RobotoBI from "./fonts/Roboto-BoldItalic.ttf";
import RobotoItalic from "./fonts/Roboto-Italic.ttf";
// Global functions
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";

Font.register({
  family: "Syncopate",
  src: SyncopateBold,
});

Font.register({
  family: "Roboto-Light",
  src: RobotoLight,
});

Font.register({
  family: "Roboto-Medium",
  src: RobotoMedium,
});

Font.register({
  family: "Roboto",
  src: RobotoBI,
});

Font.register({
  family: "Roboto-Italic",
  src: RobotoItalic,
});

// Create styles
const styles = StyleSheet.create({
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    position: "relative",
    height: "55px",
    width: "100%",
    borderBottom: "2px solid #62dafc",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
  },
  logoText: {
    fontFamily: "Syncopate",
    position: "absolute",
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
    marginTop: "18px",
  },
  barText: {
    fontSize: "10px",
    fontFamily: "Roboto-Medium",
    marginTop: "9px",
    marginBottom: "10px",
    marginLeft: "60px",
  },
  textBlock: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  inlineText: {
    marginRight: "15px",
  },
  genericText: {
    fontSize: "9px",
    marginLeft: "40px",
    marginRight: "40px",
    fontFamily: "Roboto-Light",
    lineHeight: "1.5px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    textTransform: "capitalize",
    letterSpacing: "3px",
    fontFamily: "Roboto",
    marginTop: "35px",
    marginBottom: "20px",
    marginLeft: "15px",
  },
  label: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: "8px",
    marginLeft: "20px",
  },
  quotedText: {
    fontFamily: "Roboto-Italic",
    fontSize: "9px",
    display: "flex",
    marginLeft: "50px",
    marginRight: "50px",
  },
  fieldText: {
    fontFamily: "Roboto-Light",
    fontSize: "9px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  informationStyle: {
    marginLeft: "60px",
    marginTop: "20px",
    fontFamily: "Roboto-Light",
    fontSize: "9px",
  },
  bar: {
    width: "200px",
    height: "10px",
    border: "1px solid black",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

// Create Document Component
const PDFBoilerPlate = ({ user }) => {
  const username = user.email;
  const name = user.name;
  const surname = user.surname;
  const address = user.address;
  const city = user.city;
  const cap = user.postalCode;
  const telephoneNumber = user.telephoneNumber;
  const hardSkills = user.hardSkills;
  const softSkills = user.softSkills;
  const officeSuiteSkills = user.officeSuiteSkills;
  const experiences = user.previousExperiences;

  const proficencyConverter = (array) => {
    let relativeArray = [];
    array.forEach((element) => {
      if (element === 5) {
        relativeArray.push(198.5);
      } else {
        relativeArray.push((element * 200) / 5);
      }
    });
    return relativeArray;
  };

  const hardSkillsRelativeProficency = proficencyConverter(
    GlobalUtilities.getProficencies(hardSkills)
  );
  const officeSuiteSkillsRelativeProficency = proficencyConverter(
    GlobalUtilities.getProficencies(officeSuiteSkills)
  );
  const softSkillsRelativeProficency = proficencyConverter(
    GlobalUtilities.getProficencies(softSkills)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.verticalContainer}>
          {/* HEADER */}
          <View style={{ marginBottom: "25px" }} fixed>
            <View style={styles.header}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={logo}
                  style={{
                    width: "50px",
                    marginLeft: "270px",
                  }}
                ></Image>
              </View>
              <View style={styles.logoText}>
                <Text className="logo-text">CERTIMETER</Text>
              </View>
            </View>
          </View>

          {/* HEADER */}
          <View style={styles.horizontalContainer}>
            {/* INFORMATIONS */}
            <View style={styles.verticalContainer}>
              <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.fieldText}>{username}</Text>
              </View>
              <View style={{ marginTop: "5px" }}>
                <View style={styles.horizontalContainer}>
                  <Text style={styles.label}>Nome Completo:</Text>
                  <Text style={styles.fieldText}>
                    {name} {surname}
                  </Text>
                </View>
              </View>

              <View style={styles.textBlock}>
                <View style={styles.horizontalContainer}>
                  <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Indirizzo:</Text>
                    <Text style={styles.fieldText}>{address}</Text>
                  </View>
                  {cap ? (
                    <View style={styles.horizontalContainer}>
                      <Text style={styles.label}>Cap:</Text>
                      <Text style={styles.fieldText}>{cap}</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{ marginTop: "5px" }}>
                  <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Città di residenza:</Text>
                    <Text style={styles.fieldText}>{city}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Numero di telefono:</Text>
                <Text style={styles.fieldText}>{telephoneNumber}</Text>
              </View>
            </View>

            {/* INFORMATIONS */}
          </View>
          {/* HARD SKILLS */}
          {/* PROGRAMMING-LANGUAGES */}
          <View style={styles.verticalContainer}>
            <Text style={styles.title}> Programming languages</Text>
            <Text style={styles.genericText}>
              In questa sezione viene mostrata un'infografica, con l'aiuto di un
              grafico a barre, che punta a dare un'idea di quello che è il mio
              livello di conoscienza di ciascuno dei linguaggi presenti
              all'interno del mio curriculum. Le valutazioni non sono solamente
              oggettive visto che i miei capi avevano la possibilità, tramite la
              loro dashboard, di visualizzare e modificare alcune delle
              informazioni presenti nel mio account.
            </Text>
            <View style={styles.horizontalContainer}>
              <View style={styles.verticalContainer}>
                {GlobalUtilities.getSkills(hardSkills).map(
                  (programmingLanguage) => (
                    <Text style={styles.barText}>{programmingLanguage}</Text>
                  )
                )}
              </View>
              <View style={styles.verticalContainer}>
                {hardSkillsRelativeProficency.map((relativeProficency) => (
                  <View style={styles.bar}>
                    <View
                      key={relativeProficency}
                      style={{
                        width: relativeProficency + "px",
                        height: "10px",
                        backgroundColor: "orange",
                      }}
                    ></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* PROGRAMMING-LANGUAGES */}
          {/* OFFICE-SUITE */}
          <View style={styles.verticalContainer}>
            <Text style={styles.title}> Office suite</Text>
            <View style={styles.horizontalContainer}>
              <View style={styles.verticalContainer}>
                {GlobalUtilities.getSkills(officeSuiteSkills).map((program) => (
                  <Text style={styles.barText}>{program}</Text>
                ))}
              </View>
              <View style={styles.verticalContainer}>
                {officeSuiteSkillsRelativeProficency.map(
                  (relativeProficency) => (
                    <View style={styles.bar}>
                      <View
                        key={relativeProficency}
                        style={{
                          width: relativeProficency + "px",
                          height: "10px",
                          backgroundColor: "purple",
                        }}
                      ></View>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
          {/* OFFICE-SUITE */}
          {/* SOFT-SKILLS */}
          <View style={styles.verticalContainer}>
            <Text style={styles.title}> Soft skills</Text>
            <Text style={styles.genericText}>
              In questa sezione viene mostrata un'infografica, come in quella
              precedente,con l'aiuto di un grafico a barre, punto a mostrare
              quali siano i miei punti forti in quanto lavoratore, anche in
              questo caso, come in quello sopra, i dati possono essere
              modificati dai miei datori di lavoro e quindi non si tratta di
              un'analisi puramente personale ma la potremmo considerare una
              valutazione pseudo-oggettiva delle mie capacità.
            </Text>
            <View style={styles.horizontalContainer}>
              <View style={styles.verticalContainer}>
                {GlobalUtilities.getSkills(softSkills).map((softSkill) => (
                  <Text style={styles.barText}>{softSkill}</Text>
                ))}
              </View>
              <View style={styles.verticalContainer}>
                {softSkillsRelativeProficency.map((relativeProficency) => (
                  <View style={styles.bar}>
                    <View
                      key={relativeProficency}
                      style={{
                        width: relativeProficency + "px",
                        height: "10px",
                        backgroundColor: "pink",
                      }}
                    ></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* SOFT-SKILLS */}
          <View style={styles.verticalContainer}>
            <Text style={styles.title}>Previous Experiences</Text>
            {experiences.map((experience) => {
              return (
                <View style={{ marginBottom: "50px" }}>
                  <View style={styles.verticalContainer}>
                    <View style={styles.verticalContainer}>
                      <View style={{ marginBottom: "10px" }}>
                        <View style={styles.horizontalContainer}>
                          <View style={styles.horizontalContainer}>
                            <Text style={styles.label}>Company:</Text>
                            <Text style={styles.fieldText}>
                              {experience.company}
                            </Text>
                          </View>
                          <View style={styles.horizontalContainer}>
                            <Text style={styles.label}>Posizione:</Text>
                            <Text style={styles.fieldText}>
                              {experience.position}
                            </Text>
                          </View>
                          <View style={styles.horizontalContainer}>
                            <Text style={styles.label}>Data di inizio:</Text>
                            <Text style={styles.fieldText}>
                              {experience.startDate.day +
                                "/" +
                                experience.startDate.month +
                                "/" +
                                experience.startDate.year}
                            </Text>
                          </View>
                          <View style={styles.horizontalContainer}>
                            <Text style={styles.label}>Data di fine:</Text>
                            <Text style={styles.fieldText}>
                              {experience.endDate.day +
                                "/" +
                                experience.endDate.month +
                                "/" +
                                experience.endDate.year}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {experience.companyConsulting ? (
                        <View style={styles.horizontalContainer}>
                          <Text style={styles.label}>
                            Compagnia consultata:
                          </Text>
                          <Text style={styles.fieldText}>
                            {experience.companyConsulting}
                          </Text>
                        </View>
                      ) : (
                        <></>
                      )}
                      {experience.description ? (
                        <Text style={styles.quotedText}>
                          {experience.description}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

export default PDFBoilerPlate;
