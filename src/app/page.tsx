"use client";
import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "@/hooks/use-theme";
import { ChatbotReminder } from "@/components/ChatbotReminder";
const Page = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main className="w-full mx-auto">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
          <Footer />
        </main>
        <ChatBot />
        <ChatbotReminder />
      </div>
    </ThemeProvider>
  );
};

export default Page;
