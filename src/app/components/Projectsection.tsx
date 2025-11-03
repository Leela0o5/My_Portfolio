"use client"; 

import { Github, Play } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "AI Powered Car Control System",
    status: "Under Development",
    description:
      "Developing an intelligent robotic car controlled by natural language commands via ChatGPT. The ESP32 manages Wi-Fi/API, while an Arduino handles motor and sensor control.",
    tech: ["Arduino", "ESP32", "C/C++", "Python", "ChatGPT API", "Wi-Fi"],
    links: {
      github: "https://github.com/Leela0o5/AI-Powered-Car-Control-System",
      demo: "",
    },
  },
  {
    title: "Hex Launcher - Desktop Command Center",
    description:
      "Contributed to a desktop app that launches 25+ installed applications and streamlines 10+ system control functions (shutdown, restart) into one interface.",
    tech: ["Electron.js", "JavaScript", "HTML", "CSS"],
    links: {
      github: "https://github.com/Leela0o5/Hex-Launcher",
      demo: "",
    },
  },
  {
    title: "EEG Data Analysis using ML",
    description:
      "A Streamlit web app to classify EEG signals and predict letters 'A' or 'B' from CSV data using a Support Vector Machine (SVM) model.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "SVM"],
    links: {
      github: "https://github.com/Leela0o5/EEG-Data-Analysis",
      demo: "https://www.dropbox.com/scl/fi/tmra9tkcjtpy88efgobpt/Appdemo.mp4?rlkey=qrrvcf42yngf1xc3kx5ncsuae&st=koxbt5e3&dl=0", // 👈 ADD DEMO LINK
    },
  },
  {
    title: "Database Backup CLI Utility",
    description:
      "A command-line utility to automate backup and restore operations for PostgreSQL, MySQL, MongoDB, and SQLite databases with robust error handling.",
    tech: ["Python", "CLI"],
    links: {
      github: "https://github.com/Leela0o5/Database-Backup-CLI-Utility",
      demo: "",
    },
  },
];


export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
          My
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 ml-3">
            Projects
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.title}
              className="flex flex-col justify-between h-full 
                         bg-black/50 backdrop-blur-lg 
                         border border-yellow-400/30 
                         rounded-lg shadow-2xl shadow-yellow-400/10
                         p-6 transition-all duration-300
                         hover:border-yellow-400/50 hover:shadow-yellow-400/20"
            >
              <div>

                <h2 className="text-2xl font-semibold text-white mb-2">
                  {project.title}
                </h2>
                {project.status && (
                  <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
                    {project.status}
                  </span>
                )}
                <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6">

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700/60 text-gray-300 
                                 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-yellow-400 
                                 transition-colors hover:text-yellow-300"
                    >
                      <Github className="h-5 w-5" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-yellow-400 
                                 transition-colors hover:text-yellow-300"
                    >
                      <Play className="h-5 w-5" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
