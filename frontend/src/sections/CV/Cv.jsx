import React, { useState } from "react";
import "./Cv.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Cv = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    skills: [],
    softSkills: [],
    languages: "",
    education: [{ degree: "", institute: "", year: "" }],
    experience: [{ role: "", company: "", duration: "", details: "" }],
    projects: [{ name: "", tech: "", desc: "", link: "" }],
    certifications: ""
  });

  const skillOptions = ["HTML", "CSS", "JavaScript", "React", "Python", "SQL", "Java"];
  const softSkillOptions = ["Communication", "Leadership", "Teamwork", "Adaptability"];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleSkill = (skill, type) => {
    const list = data[type];
    setData({
      ...data,
      [type]: list.includes(skill)
        ? list.filter((s) => s !== skill)
        : [...list, skill]
    });
  };

  const updateArray = (index, field, value, section) => {
    const copy = [...data[section]];
    copy[index][field] = value;
    setData({ ...data, [section]: copy });
  };

  const addRow = (section, emptyObj) => {
    setData({ ...data, [section]: [...data[section], emptyObj] });
  };

  const downloadPDF = async () => {
    const cvElement = document.getElementById("cv-form-only");
    const canvas = await html2canvas(cvElement, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.name || "My"}_CV.pdf`);
  };

  return (
    <div className="cv-container">
      {/* LEFT SIDE: INPUT FORM */}
      <div className="cv-form">
        <h2>CV Editor</h2>
        
        <h4>Personal Details</h4>
        <input placeholder="Full Name" name="name" onChange={handleChange} />
        <input placeholder="Job Title" name="title" onChange={handleChange} />
        <div style={{ display: "flex", gap: "10px" }}>
          <input placeholder="Email" name="email" onChange={handleChange} />
          <input placeholder="Phone" name="phone" onChange={handleChange} />
        </div>
        <input placeholder="City, Country" name="location" onChange={handleChange} />
        <input placeholder="LinkedIn / Portfolio URL" name="linkedin" onChange={handleChange} />

        <h4>Professional Summary</h4>
        <textarea placeholder="Write a brief intro..." name="summary" onChange={handleChange} />

        <h4>Technical Skills</h4>
        <div className="skill-chips">
          {skillOptions.map((skill) => (
            <label key={skill}>
              <input type="checkbox" onChange={() => toggleSkill(skill, "skills")} />
              {skill}
            </label>
          ))}
        </div>

        <h4>Education</h4>
        {data.education.map((edu, i) => (
          <div key={i} className="form-group">
            <input placeholder="Degree" onChange={(e) => updateArray(i, "degree", e.target.value, "education")} />
            <input placeholder="Institute" onChange={(e) => updateArray(i, "institute", e.target.value, "education")} />
            <input placeholder="Year" onChange={(e) => updateArray(i, "year", e.target.value, "education")} />
          </div>
        ))}
        <button className="add-btn" onClick={() => addRow("education", { degree: "", institute: "", year: "" })}>+ Add Education</button>

        <h4>Experience</h4>
        {data.experience.map((exp, i) => (
          <div key={i} className="form-group">
            <input placeholder="Job Role" onChange={(e) => updateArray(i, "role", e.target.value, "experience")} />
            <input placeholder="Company" onChange={(e) => updateArray(i, "company", e.target.value, "experience")} />
            <input placeholder="Duration (e.g. 2022 - Present)" onChange={(e) => updateArray(i, "duration", e.target.value, "experience")} />
            <textarea placeholder="Key Responsibilities..." onChange={(e) => updateArray(i, "details", e.target.value, "experience")} />
          </div>
        ))}
        <button className="add-btn" onClick={() => addRow("experience", { role: "", company: "", duration: "", details: "" })}>+ Add Experience</button>

        <h4>Projects</h4>
        {data.projects.map((p, i) => (
          <div key={i} className="form-group">
            <input placeholder="Project Name" onChange={(e) => updateArray(i, "name", e.target.value, "projects")} />
            <input placeholder="Tech Stack" onChange={(e) => updateArray(i, "tech", e.target.value, "projects")} />
            <textarea placeholder="Briefly explain the project..." onChange={(e) => updateArray(i, "desc", e.target.value, "projects")} />
          </div>
        ))}
        <button className="add-btn" onClick={() => addRow("projects", { name: "", tech: "", desc: "", link: "" })}>+ Add Project</button>

        <button onClick={downloadPDF} style={{ background: "#059669", marginTop: "30px", fontSize: "16px" }}>
          Download CV
        </button>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="cv-preview-container">
        <div className="cv-preview" id="cv-form-only">
          <div className="preview-header">
            <h1>{data.name || "YOUR NAME"}</h1>
            <p className="preview-title">{data.title || "PROFESSIONAL TITLE"}</p>
            <div className="contact-info">
              {data.email && <span>📧 {data.email}</span>}
              {data.phone && <span>📞 {data.phone}</span>}
              {data.location && <span>📍 {data.location}</span>}
            </div>
          </div>

          {data.summary && (
            <div className="preview-section">
              <div className="section-title">Professional Summary</div>
              <p className="summary-text">{data.summary}</p>
            </div>
          )}

          <div className="preview-section">
            <div className="section-title">Core Competencies</div>
            <div className="skills-list">
              {data.skills.map((s) => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>

          <div className="preview-section">
            <div className="section-title">Professional Experience</div>
            {data.experience.map((exp, i) => (
              <div className="preview-item" key={i}>
                <div className="item-header">
                  <strong>{exp.role}</strong>
                  <span>{exp.duration}</span>
                </div>
                <div className="item-sub">{exp.company}</div>
                <p className="item-desc">{exp.details}</p>
              </div>
            ))}
          </div>

          <div className="preview-section">
            <div className="section-title">Education</div>
            {data.education.map((edu, i) => (
              <div className="preview-item" key={i}>
                <div className="item-header">
                  <strong>{edu.degree}</strong>
                  <span>{edu.year}</span>
                </div>
                <div className="item-sub">{edu.institute}</div>
              </div>
            ))}
          </div>

          {data.projects[0].name && (
            <div className="preview-section">
              <div className="section-title">Key Projects</div>
              {data.projects.map((p, i) => (
                <div className="preview-item" key={i}>
                  <div className="item-header">
                    <strong>{p.name}</strong>
                    <span className="tech-badge">{p.tech}</span>
                  </div>
                  <p className="item-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cv;