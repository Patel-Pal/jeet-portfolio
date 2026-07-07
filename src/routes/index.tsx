import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/navbar";
import { BackgroundFX } from "@/components/portfolio/background-fx";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { AnalyticsPlayground } from "@/components/portfolio/analytics-playground";
import { AnalyticsShowcase } from "@/components/portfolio/analytics-showcase";
import { EducationTimeline } from "@/components/portfolio/education";
import { CareerJourney } from "@/components/portfolio/career";
import { Certifications } from "@/components/portfolio/certifications";
import { LanguagesAndInterests } from "@/components/portfolio/interests";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundFX />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AnalyticsPlayground />
        <AnalyticsShowcase />
        <EducationTimeline />
        <CareerJourney />
        <Certifications />
        <LanguagesAndInterests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
