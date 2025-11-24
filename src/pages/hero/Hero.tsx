import "./Hero.css"
import Name from "../../assets/Name.png"
import Me from "../../assets/me-bg.png"
import TechIconsGrid from "../hero/TechIconsGrid";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiArrowBendRightDownBold } from "react-icons/pi";


import { useState } from "react";

function Hero() {

  const [, setActive] = useState("");



  return (
    <div className="max-w-screen-xl mx-auto pt-26 px-4 pb-24">
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
          <div className="hero-grid-item-me-img"><img className="w-full h-auto rounded-sm" src={Me} alt="Saran" /></div>
          <div className="hero-grid-item-desc text-center md:text-left">
            <h1 className="lg:text-6xl text-4xl uppercase font-bold tracking-wider color-yellow">Web Developer</h1>
            <p className="pt-4 mb-0 sm:mb-7">Experienced in <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#0678be]">Drupal development</a>, using <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#f7df1e]">JavaScript</a>, <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#61dafb]">React</a>, CSS, Twig, and Bootstrap to build
              fast, scalable, SEO-friendly websites. Focused
              on clean front-end architecture, efficient
              debugging, and seamless design integration.</p>
          </div>
          <div className="flex gap-10">
            <a href="#projects" className="hero-grid-item-button">
              <button
                onClick={() => setActive("#projects")}
                className="bg-[#FED027] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FED027] font-bold px-3 lg:px-6 py-2.5 border-[#FED027] border-2 rounded-sm inline-flex items-center gap-2">
                <PiArrowBendRightDownBold className="text-lg" />
                View projects
              </button>
            </a>
            <a target="_blank" href="https://drive.google.com/file/d/1pUpSGQiNXj7saV5yEILvPEKz_Z7MqJ37/view" className="hero-grid-item-button">
              <button
                onClick={() => setActive("#projects")}
              className="bg-opacity-0 hover:bg-[#FED027] text-[#FED027] hover:text-[#0A0A0A] font-bold px-3 lg:px-6 py-2.5 border-[#FED027] border-2 rounded-sm inline-flex items-center gap-2">
                <IoNewspaperOutline className="text-lg" />
                Resume
              </button>
            </a>
          </div>
        </div>

        {/* SECTION Skills Icons */}
        <TechIconsGrid />
      </div>
  );
}

export default Hero;

