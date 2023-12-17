import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const sections = {
    basicInfo: "Personal Details",
    summary: "Professional Summary",
    workExp: "Work Experience",
    education: "Education",
    skills:"Skills",
    langauge:"Langauge",
    project: "Projects",       
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
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.langauge]:{
      id:sections.langauge,
      sectionTitle:sections.langauge,
      point:[],
    },


  });

  return (
    <div className={styles.container}>

      
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
        <div className={styles.leftside}>
          <Resume
            ref={resumeRef}
            sections={sections}
            information={resumeInformation}
            
          />
        </div>

      </div>
    </div>
  );
}

export default Body;
