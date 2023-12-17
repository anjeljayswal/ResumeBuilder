import html2pdf  from "html2pdf.js";

import ReactToPrint from "react-to-print";
import { ArrowDown, Download } from "react-feather";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

import styles from "./Resume.module.css";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();
  const resumeRef = useRef();
  const pdfRef = useRef();
  const imgRef = useRef();

  const [loader, setLoader] = useState(false);
  const downloadPDF = () => {
    const capture = document.querySelector('.rbody');
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }
  const handleSaveAsDocument = () => {
    const contentElement = document.getElementById('content');

    if (contentElement) {
      html2pdf(contentElement, {
        margin: 10,
        filename: "fileName",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      });
    } else {
      console.error(`Element with id  not found.`);
    }
  };


  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {

    langauge: information[sections.langauge],
    workExp: information[sections.workExp],
    project: information[sections.project],
    skills: information[sections.skills],

    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],

  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    // [sections.basicInfo]: (
    //   <div key={"basicInfo"} className={styles.section}>
    //     <div className={styles.profilemain}>
    //       <div className={styles.profilemain1}>
    //         <p className={styles.heading}>{info.basicInfo?.detail?.fname}</p>
    //         <p className={styles.subHeading}>{info.basicInfo?.detail?.jtitle}</p>
    //       </div>
    //       <div className={styles.profilemain2}>
    //         {/* You can add an image here if needed */}
    //       </div>
    //     </div>
    //     <div className={styles.links}>
    //       {info.basicInfo?.detail?.email ? (
    //         <a className={styles.link} type="email">
    //           <AtSign /> {info.basicInfo?.detail?.email}
    //         </a>
    //       ) : (
    //         <span />
    //       )}

    //       {info.basicInfo?.detail?.linkedin ? (
    //         <a className={styles.link}>
    //           <Linkedin /> {info.basicInfo?.detail?.linkedin}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //       {info.basicInfo?.detail?.github ? (
    //         <a className={styles.link}>
    //           <GitHub /> {info.basicInfo?.detail?.github}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //       {info.basicInfo?.detail?.phone ? (
    //         <a className={styles.link}>
    //           <Phone /> {info.basicInfo?.detail?.phone}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //     </div>
    //   </div>
    // ),
    // [sections.basicInfo]: (
    //   <div key={"basicInfo"} className={styles.sections}>
    //     {/* <div className={styles.profilemain}> */}
    //     {/* <div className={styles.profilemain2}> */}
    //         {/* Add image here with circle shape */}
    //         <img
    //           src={info.basicInfo?.detail?.imageUrl}  
    //           alt="Profile"
    //           className={styles.profileImage}
    //         />
    //       {/* </div> */}
    //       {/* <div className={styles.profilemain1}> */}
    //         <p className={styles.heading}>{info.basicInfo?.detail?.fname}</p>
    //         <p className={styles.subHeading}>{info.basicInfo?.detail?.jtitle}</p>
    //       {/* </div> */}

    //     {/* </div> */}
    //     <div className={styles.links}>
    //       {info.basicInfo?.detail?.email ? (
    //         <a className={styles.link} type="email">
    //           <AtSign /> {info.basicInfo?.detail?.email}
    //         </a>
    //       ) : (
    //         <span />
    //       )}

    //       {info.basicInfo?.detail?.linkedin ? (
    //         <a className={styles.link}>
    //           <Linkedin /> {info.basicInfo?.detail?.linkedin}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //       {info.basicInfo?.detail?.github ? (
    //         <a className={styles.link}>
    //           <GitHub /> {info.basicInfo?.detail?.github}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //       {info.basicInfo?.detail?.phone ? (
    //         <a className={styles.link}>
    //           <Phone /> {info.basicInfo?.detail?.phone}
    //         </a>
    //       ) : (
    //         <span />
    //       )}
    //     </div>
    //   </div>
    // ),


    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${info.workExp?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className={styles.subTitle}>{item.companyName}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <p className={styles.date}>
                  <MapPin /> Remote
                </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${info.project?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.link ? (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${info.education?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className={styles.subTitle}>{item.college}</p>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.skills]: (
      <div
        key={"skills"}
        draggable
        onDragOver={() => seTarget(info.skills?.id)}
        onDragEnd={() => setSource(info.skills?.id)}
        className={`${styles.section} ${info.skills?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>
          {info.skills?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.skills?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.skills?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.langauge]: (
      <div
        key={"langauge"}
        draggable
        onDragOver={() => seTarget(info.langauge?.id)}
        onDragEnd={() => setSource(info.langauge?.id)}
        className={`${styles.section} ${info.langauge?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>
          {info.langauge?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.langauge?.point?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.langauge?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${styles.section} ${info.summary?.sectionTitle ? "" : styles.hidden
          }`}
      >
        <div className={styles.sectionTitle}>{info.summary?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.summary?.detail}</p>
        </div>
      </div>
    ),

  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.langauge, sections.skills],
      [sections.summary, sections.project, sections.workExp, sections.education,],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!props.activeColor || !container) return;

  //   container.style.setProperty("--color", props.activeColor);
  // }, [props.activeColor]);

  const handleDownload = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      // input.current=[...input.current,canvas];
      // imgRef.current=canvas;
      // console.log(input,canvas);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio)/2 ;
      const imgY = 10;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    })
  };

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>

        <div className={styles.mainheader}>
          <button>Select</button>
          <button>-</button>
          <p>Aa</p>
          <button>+</button>
          <button onClick={handleDownload}>Download PDF</button>
          {/* <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        /> */}
          <button
            onClick={downloadPDF}
            disabled={loader}
          >
            {loader ? (
              <span>Downloading</span>
            ) : (
              <span>Download</span>
            )}
          </button>
          <button onClick={handleSaveAsDocument}>Save as Document</button>

        </div>
        
        <div ref={pdfRef} id="content" className={styles.rbody}>
          {/* <div className={styles.subrbody}> */}
          <div className={styles.header}>
            <div className={styles.profilemain}>
              <div className={styles.profilemain1}>
                <p className={styles.heading}>{info.basicInfo?.detail?.name}</p>
                <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>
              </div>


            </div>


            <div className={styles.links}>
              {info.basicInfo?.detail?.email ? (
                <a className={styles.link} type="email">
                  <AtSign /> {info.basicInfo?.detail?.email}
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.phone ? (
                <a className={styles.link}>
                  <Phone /> {info.basicInfo?.detail?.phone}
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.linkedin ? (
                <a className={styles.link}>
                  <Linkedin /> {info.basicInfo?.detail?.linkedin}
                </a>
              ) : (
                <span />
              )}
              {info.basicInfo?.detail?.github ? (
                <a className={styles.link}>
                  <GitHub /> {info.basicInfo?.detail?.github}
                </a>
              ) : (
                <span />
              )}
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.col1}>
              {columns[0].map((item) => sectionDiv[item])}
            </div>
            <div className={styles.col2}>
              {columns[1].map((item) => sectionDiv[item])}
            </div>
          </div>

          {/* </div> */}
        </div>

      </div>
    </div>
  );
});

export default Resume;
