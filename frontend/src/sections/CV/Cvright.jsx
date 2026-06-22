import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CvRight = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
  });

  const cvPreviewRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = async () => {
    const element = cvPreviewRef.current;
    if (!element) return alert("CV not ready");

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${formData.name || "My"}_CV.pdf`);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-slate-100 p-6 gap-8">

      {/* FORM */}
      <div className="flex-1 bg-white p-8 rounded-3xl shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Personal Details
        </h2>

        {["name","email","phone","skills"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl"
          />
        ))}

        {["summary","experience","education"].map((field) => (
          <textarea
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-xl"
          />
        ))}

        <button
          onClick={downloadPDF}
          className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800"
        >
          DOWNLOAD CV
        </button>
      </div>

      {/* LIVE PREVIEW */}
      <div className="flex-1 bg-gray-200 p-6 overflow-auto flex justify-center">
        <div className="transform scale-75 origin-top">
          <div
            className="bg-white shadow-xl"
            style={{ width: "210mm", minHeight: "297mm" }}
          >

            {/* HEADER */}
            <div className="bg-blue-900 text-white p-10">
              <h1 className="text-4xl font-bold">
                {formData.name || "YOUR NAME"}
              </h1>
              <p className="mt-2 text-blue-100">
                {formData.email || "email@example.com"} |{" "}
                {formData.phone || "0300-1234567"}
              </p>
            </div>

            {/* BODY */}
            <div className="p-12 space-y-8 text-slate-800">

              <section>
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">
                  Professional Summary
                </h3>
                <p>{formData.summary}</p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">
                  Experience
                </h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {formData.experience}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">
                  Education
                </h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {formData.education}
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">
                  Skills
                </h3>
                <p>{formData.skills}</p>
              </section>

            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN PDF VERSION */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <div
          ref={cvPreviewRef}
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "64px",
            background: "white",
            fontFamily: "sans-serif",
          }}
        >
          <h1>{formData.name}</h1>
          <p>{formData.email} | {formData.phone}</p>
          <hr />
          <p>{formData.summary}</p>
          <p style={{ whiteSpace: "pre-line" }}>{formData.experience}</p>
          <p style={{ whiteSpace: "pre-line" }}>{formData.education}</p>
          <p>{formData.skills}</p>
        </div>
      </div>
    </div>
  );
};

export default CvRight;
