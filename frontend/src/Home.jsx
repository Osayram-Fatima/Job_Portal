import { Import } from "lucide-react";
import Hero from "./sections/Hero/Hero";
import Section2 from "./sections/sec2/Section2";
import Section2a from "./sections/sec2a/Section2a";
import Section2b from "./sections/sec2b/Section2b";
import Section3 from "./sections/sec3/Section3";
import Nav from "./sections/Nav/Nav";
import Footer from "./sections/Footer/Footer";
const Home = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Section2b />
      <Section2a />
      <Section2 />
      <Section3 />
   
    </>
  );
};

export default Home;
