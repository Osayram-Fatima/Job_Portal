import React from "react";
import Secmain from "./Secmain";
import Bg from "./Bg";
import Header from "./Header";

const Section2 = () => {
  return (
    <section id="job-section" className="relative w-full">
      {/* Background behind everything */}
      <div className="absolute inset-0 -z-10">
        <Bg />
      </div>

      {/* Header upar */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Secmain niche / center etc. */}
      <div className="relative z-10">
        <Secmain />
      </div>
    </section>
  );
};

export default Section2;
