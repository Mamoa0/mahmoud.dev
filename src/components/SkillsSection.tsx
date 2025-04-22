import React, { useState } from "react";
import AnimatedSkillCard from "@/components/AnimatedSkillCard";
import {
  Code,
  Smartphone,
  Palette,
  Database,
  Globe,
  Users,
} from "lucide-react";

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    percentage: number;
    color: string;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "React.js", percentage: 95, color: "bg-blue-600" },
      { name: "Next.js", percentage: 95, color: "bg-sky-600" },
      { name: "JavaScript / TypeScript (ES6+)", percentage: 90, color: "bg-yellow-500" },
      { name: "HTML5", percentage: 95, color: "bg-orange-500" },
      { name: "CSS3 / SCSS", percentage: 90, color: "bg-cyan-600" },
      { name: "TailwindCSS", percentage: 95, color: "bg-teal-500" },
      { name: "Bootstrap 5", percentage: 85, color: "bg-indigo-500" },
      { name: "Material UI / Chakra UI / shadcn", percentage: 90, color: "bg-pink-500" },
      { name: "Redux Toolkit / Zustand", percentage: 90, color: "bg-rose-500" },
      { name: "Git / GitHub", percentage: 85, color: "bg-purple-600" },
    ],
  }
  ,
  {
    title: "UI/UX & Design",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "Material UI", percentage: 90, color: "bg-teal-500" },
      { name: "Chakra UI", percentage: 85, color: "bg-pink-500" },
      { name: "Framer Motion", percentage: 80, color: "bg-purple-600" },
      {
        name: "Responsive design principles",
        percentage: 85,
        color: "bg-pink-600",
      },
      { name: "UI component libraries", percentage: 95, color: "bg-green-500" },
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-5 w-5" />,
    skills: [
      { name: "React Native", percentage: 75, color: "bg-blue-600" },
      { name: "Native Modules", percentage: 75, color: "bg-blue-700" },
      { name: "Expo", percentage: 75, color: "bg-gray-700" },
      { name: "Firebase", percentage: 80, color: "bg-yellow-600" },
    ],
  },
  {
    title: "Backend Knowledge",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Node.js", percentage: 85, color: "bg-green-600" },
      { name: "Express.js", percentage: 80, color: "bg-gray-600" },
      { name: "Firebase", percentage: 70, color: "bg-yellow-600" },
      { name: "GraphQL", percentage: 60, color: "bg-pink-700" },
      { name: "RESTful APIs", percentage: 90, color: "bg-blue-700" },
      { name: "MongoDB", percentage: 85, color: "bg-green-700" },
      { name: "MySQL", percentage: 70, color: "bg-indigo-600" },
      { name: "Sequelize ORM", percentage: 70, color: "bg-purple-600" },
      { name: "Mongoose ODM", percentage: 80, color: "bg-teal-600" },
    ],
  },
  {
    title: "Soft Skills",
    icon: <Users className="h-5 w-5" />, 
    skills: [
      { name: "Communication", percentage: 90, color: "bg-blue-600" },
      { name: "Problem Solving", percentage: 85, color: "bg-green-600" },
      { name: "Teamwork", percentage: 88, color: "bg-purple-600" },
      { name: "Adaptability", percentage: 80, color: "bg-orange-600" },
      { name: "Time Management", percentage: 75, color: "bg-yellow-600" },
      { name: "Self-Learning", percentage: 95, color: "bg-teal-600" },
      { name: "Working Under Pressure", percentage: 85, color: "bg-red-600" },
    ],
  },
  
  {
    title: "Other Skills",
    icon: <Globe className="h-5 w-5" />,
    skills: [
      { name: "Testing", percentage: 60, color: "bg-red-600" },
      {
        name: "Performance Optimization",
        percentage: 75,
        color: "bg-yellow-600",
      },
      { name: "PWAs", percentage: 60, color: "bg-blue-500" },
      { name: "Accessibility", percentage: 70, color: "bg-green-600" },
    ],
  },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    "Frontend Development"
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="gradient-text animate-gradient-text">
              My Skills
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-teal-500"></div>
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            A curated list of the technologies, tools, and frameworks I’ve
            worked with — showcasing both my technical expertise and my ability
            to adapt to modern development workflows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === category.title
                  ? "bg-gradient-to-r from-purple-600 to-teal-500 text-white shadow-lg"
                  : "bg-secondary/50 hover:bg-secondary text-foreground"
              }`}
            >
              {category.icon}
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories
            .find((category) => category.title === activeCategory)
            ?.skills.map((skill) => (
              <AnimatedSkillCard
                key={skill.name}
                icon={
                  skillCategories.find((c) => c.title === activeCategory)?.icon
                }
                title={skill.name}
                percentage={skill.percentage}
                color={skill.color}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
