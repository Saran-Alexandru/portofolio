
import "./projects.css";
import { highlightTech } from "../../utils/highlightTech";
import { projects } from "../../data/projects";

import { AiOutlineAim } from "react-icons/ai";



function Projects() {

  return (
    <>
      <div className="px-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-10">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-bold">
            <AiOutlineAim className="text-yellow-400 text-lg" />
            <span>My Work</span>
          </div>
        </div>

        {/* Right column */}
        <div className="max-w-xl">
          <h2 className="leading-tight">
            Projects I've Built
            <br />
            & Contributed To
          </h2>
          <p className="mt-4">
            Below are projects I developed using <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#0678be]">Drupal</a>, <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#61dafb]">React</a>, and <a className="font-semibold underline underline-offset-3 decoration-2 decoration-[#f7df1e]">JavaScript</a> — covering both CMS work and modern UI development.
          </p>
        </div>
      </div>

      {/* Project cards will go here in the future */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">

        {/* list of projects */}
        <div className="flex flex-col gap-12">
          {projects.map((project) => (
            <article
              key={project.id}
              className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 items-center border-t border-white/10 pt-8"
            >
              {/* text column */}
              <div className="space-y-4">
                <h3 className="">
                  {project.title}
                </h3>
                <p
                  className="mt-4 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightTech(project.description),
                  }}
                />


                {/* optional links */}
                <div className="flex gap-4 text-xs md:text-sm">
                  {project.link && (
                    <a
                      className="cursor-pointer"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="bg-[#FED027] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FED027] font-bold px-3 lg:px-6 py-2.5 border-[#FED027] border-2 rounded-sm inline-flex items-center gap-2">
                        View code
                      </button>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 decoration-yellow-400 hover:text-yellow-300"
                    >
                      View code
                    </a>
                  )}
                </div>
              </div>

              {/* image column */}
              <div className="rounded-md overflow-hidden border border-white/10 bg-[#111]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full max-h-[520px] object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

    </>
  );
}

export default Projects;

