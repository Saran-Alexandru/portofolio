import "./Hero.css"
import Name from "../../assets/Name.png"
import Me from "../../assets/me-bg.png"

import { PiArrowBendRightDownBold } from "react-icons/pi";
import {
  SiDrupal,
  SiPhp,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiBootstrap,
  SiGit,
  SiShopify,
  SiWix,
  SiTildapublishing,
  SiSass,
  SiReact,
  SiTailwindcss
} from "react-icons/si";

import { useState } from "react";

function Hero() {

  const [, setActive] = useState("");

  const icons = [
    <SiDrupal className="skill-icon drupal" />,
    <SiPhp className="skill-icon php" />,
    <SiJavascript className="skill-icon js" />,
    <SiCss3 className="skill-icon css" />,
    <SiSass className="skill-icon sass" />,
    <SiHtml5 className="skill-icon html" />,
    <SiBootstrap className="skill-icon bootstrap" />,
    <SiTailwindcss className="skill-icon tailwind" />,
    <SiReact className="skill-icon react" />,
    <SiGit className="skill-icon git" />,
    <SiShopify className="skill-icon shopify" />,
    <SiWix className="skill-icon wix" />,
    <SiTildapublishing className="skill-icon tilda" />,
  ];

  return (
    <section id="hero">
      <div className="max-w-screen-xl mx-auto pt-26 px-4 pb-13">

        {/* SECTION Name * Info */}
        <div className="hero-container-grid-name-info text-base lg:text-lg font-bold tracking-wider pb-10">
          <div className="hero-grid-item-name-img pb-4"><img src={Name} alt="Saran" /></div>
          <div className="hero-grid-item-text-1">#DRUPAL DEVELOPMENT</div>
          <div className="hero-grid-item-text-2">#FRONT-END</div>
          <div className="hero-grid-item-text-3">#REACT & BOOTSTRAP</div>
          <div className="hero-grid-item-text-4">#SEO BASICS</div>
        </div>

        {/* SECTION Image * Desc * Button */}
        <div className="hero-container-grid-img-desc-button sm:pb-13 pb-4">
          <div className="hero-grid-item-me-img"><img className="w-full h-auto rounded-base" src={Me} alt="Saran" /></div>
          <div className="hero-grid-item-desc text-center md:text-left">
            <h1 className="lg:text-6xl text-4xl uppercase font-bold tracking-wider color-yellow">Web Developer</h1>
            <p className="pt-4 mb-0 sm:mb-7">Experienced in <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#00ffd0]">Drupal development</a>, using
              JavaScript, React, CSS, Twig, and Bootstrap to build
              fast, scalable, SEO-friendly websites. Focused
              on clean front-end architecture, efficient
              debugging, and seamless design integration.</p>
          </div>
          <a href="#projects" className="hero-grid-item-button">
            <button
              onClick={() => setActive("#projects")}
              className="bg-[#FED027] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FED027] font-bold px-6 py-2.5 border-[#FED027] border rounded-lg inline-flex items-center gap-2">
              <PiArrowBendRightDownBold className="text-lg" />
              View projects
            </button>
          </a>
        </div>

        {/* SECTION Skills Icons */}
        <div className="skills-marquee">

          {/* Banda 1 */}
          <div className="skills-row py-1">
            <div className="skills-track">
              {icons}
              {icons}
            </div>
          </div>

          {/* Banda 2 (inverse) */}
          <div className="skills-row skills-row--reverse py-1">
            <div className="skills-track">
              {icons}
              {icons}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;

