import './App.css'
import ShaderBackground from "./components/ShaderBackground";

import NavBar from "./components/navbar/navbar"
import Hero from "./pages/hero/Hero"
import Projects from './pages/projects/projects'
import Contact from './pages/contact/contact'
import About from './pages/about/about'

import { useState } from "react";
import { useActiveSection } from "./hooks/useActiveSection";

import { useSectionSnapScroll } from "./hooks/useSectionSnapScroll"

function App() {

  const [active, setActive] = useState("");

  // ascultă schimbările între secțiuni
  useActiveSection(["hero", "projects", "about", "contact"], setActive);

  useSectionSnapScroll({
    sectionIds: ["hero", "projects", "about", "contact"],
    offset: -150,
  });

  return (
    <div className="min-h-screen overflow-hidden">
      <ShaderBackground isLight={active !== "hero"} />

      <NavBar active={active}  />

      {/* SECTION 1 — HERO */}
      <section id="hero" className="">

        <Hero />
      </section>

      {/* SECTION 2 — PROJECTS */}
      <section id="projects" className="min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto">
          <Projects />
        </div>
      </section>

      {/* SECTION 4 — ABOUT */}
      <section id="about" className="min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto">
          <About />
        </div>
      </section>

      {/* SECTION 3 — CONTACTS */}
      <section id="contact" className="min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto">
          <Contact />
        </div>
      </section>
    </div>
  )
}

export default App
