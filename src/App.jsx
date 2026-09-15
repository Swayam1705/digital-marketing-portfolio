import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ScrollStory from "./components/ScrollStory.jsx";
import About from "./components/About.jsx";
import Beliefs from "./components/Beliefs.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Funnel from "./components/Funnel.jsx";
import Experience from "./components/Experience.jsx";
import Services from "./components/Services.jsx";
import Blog from "./components/Blog.jsx";
import ResumeCTA from "./components/ResumeCTA.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

/*
 * Page order — to add/remove/reorder a section, edit this list and the
 * corresponding component file in src/components/.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <ScrollStory />
        <About />
        <Beliefs />
        <Skills />
        <Projects />
        <Funnel />
        <Experience />
        <Services />
        <Blog />
        <ResumeCTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
