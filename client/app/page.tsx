import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Resume />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
