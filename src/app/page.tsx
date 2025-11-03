import AboutPage from "./components/Aboutsection";
import ContactPage from "./components/Contactpage";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Navbar";
import ProjectsPage from "./components/Projectsection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutPage />
        <ProjectsPage />
        <ContactPage />

       
      </div>
    </>
  );
}
