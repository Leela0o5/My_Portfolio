"use client";
import { Code, GraduationCap } from "lucide-react";
export default function AboutPage() {
  const skills = [
    "MERN Stack",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Flutter",
    "Dart",
    "Tailwind CSS",
    "Python",
    "Git",
    "AI/ML",
    "Embedded Systems",
  ];

  return (
    <section
      id="about"
      className="container mx-auto max-w-7xl px-4 py-20 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
          About
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 ml-3">
            Me
          </span>
        </h1>
        <div className="space-y-6 text-lg text-gray-300 text-center leading-relaxed">
          <p>
            I am a Computer Science undergrad establishing a strong technical
            foundation across the MERN stack. I am open to web development,
            Mobile app development (Flutter/Dart) and research opportunities. My
            academic work emphasizes efficient resolution of complex bugs.
          </p>
          <p>
            I am actively integrating my foundational knowledge of AI/ML and
            Embedded Systems to shape innovative development choices and project
            outcomes.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            My Skill<span className="text-yellow-400">s</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-yellow-400/10 text-yellow-300 
                           font-medium px-4 py-2 rounded-full 
                           border border-yellow-400/30 transition-all 
                           hover:bg-yellow-400/20 hover:text-yellow-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            My Journe<span className="text-yellow-400">y</span>
          </h2>
          <div className="relative max-w-2xl mx-auto pl-10">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-yellow-400/30" />

            <div className="relative mb-8">
              <div
                className="absolute -left-12 top-1.5 flex h-8 w-8 items-center 
                            justify-center rounded-full bg-yellow-400 text-black"
              >
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                B.Tech, Computer Science & Engineering
              </h3>
              <p className="text-yellow-400 mb-1">2023 - 2027 </p>
              <p className="text-gray-400">
                Amrita Vishwa Vidyapeetham, Coimbatore
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute -left-12 top-1.5 flex h-8 w-8 items-center 
                            justify-center rounded-full bg-yellow-400 text-black"
              >
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Aspiring Software Engineer
              </h3>
              <p className="text-yellow-400 mb-1">Present</p>
              <p className="text-gray-400">
                Actively building projects and seeking new opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
