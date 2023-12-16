import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Personal Details",
    summary: "Professional Summary",
    workExp: "Work Experience",
    education: "Education",
    //social links
    social_links: "Social Links",

    skills:"Skills",
    //skills
    langauge:"Langauge",
    //langauge
    project: "Projects",

    achievement: "Achievements",
    other:"Other",

    
  };
  const resumeRef = useRef();  
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
    [sections.social_links]:{
      id:sections.social_links,
      sectionTitle:sections.social_links,
      points:[],
    },
    [sections.skills]:{
      id:sections.skills,
      sectionTitle:sections.skills,
      points:[],
    },
    [sections.langauge]:{
      id:sections.langauge,
      sectionTitle:sections.langauge,
      points:[],
    },


  });

  return (
    <div className={styles.container}>

      {/* <div className={styles.toolbar}>
        
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />

      </div> */}
      <div className={styles.main}>
        <div className={styles.leftside}>
          <p className={styles.heading}>Resume Builder</p>
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
            profilePhoto={profilePhoto}
          />

        </div>

        {/* <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setInformation}
          editorCompletion={editorCompletion}
        /> */}
        <div className={styles.leftside}>
          <Resume
            ref={resumeRef}
            sections={sections}
            information={resumeInformation}
            // activeColor={activeColor}
          />
        </div>

      </div>
    </div>
  );
}

export default Body;
