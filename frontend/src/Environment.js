const Environment = {
  // Images
  loadingIcon: "https://c.tenor.com/2djV4aR4oVoAAAAi/cat-rainbow.gif",
  // Arrays
  officeSuite: ["Skill", "Word", "PowerPoint", "Excel", "Outlook"],
  softSkills: [
    "Skill",
    "Autonomy",
    "Self Confidence",
    "Flexibility",
    "Resilience to stress",
    "Capacity of organizing",
    "Precision",
    "Learning capability",
    "Ability to achieve goals",
    "Information handling",
    "Initiative",
    "Comunication skills",
    "Problem solving",
    "Teamwork",
    "Leadership",
  ],
  sidebarData: [
    {
      title: "Skills",
      icon: "fas fa-book",
      link: "#visual",
    },
    {
      title: "Experiences",
      icon: "fas fa-clock",
      link: "#experiences",
    },
    {
      title: "Curriculum Pdf",
      icon: "fas fa-file-pdf",
      link: "#pdf",
    },
    {
      title: "Information update",
      icon: "fas fa-marker",
      link: "#settings",
    },
    {
      title: "Admin Functions",
      icon: "fas fa-lock",
      link: "#admin",
    },
    {
      title: "Logout",
      icon: "fas fa-dungeon",
      link: "#logout",
    },
  ],
  // Variables
  defaultUser: {
    email: "",
    token: "",
    name: "",
    surname: "",
    address: "",
    postalCode: "",
    city: "",
    telephoneNumber: "",
    birthday: { day: 9, month: "July", year: 2006 },
    hardSkills: [],
    officeSuiteSkills: [],
    softSkills: [],
    previousExperiences: [],
    position: "",
    authority: "user",
    salary: "",
  },
};

export default Environment;
