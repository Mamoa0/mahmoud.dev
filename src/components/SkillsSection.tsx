import React from "react";
import AnimatedSkillCard from "@/components/AnimatedSkillCard";
import {
  Code,
  Smartphone,
  Palette,
  Database,
  Globe,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    color: string;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "React.js", color: "from-blue-600/20 to-blue-600/40" },
      { name: "Next.js", color: "from-sky-600/20 to-sky-600/40" },
      { name: "JavaScript / TypeScript", color: "from-yellow-500/20 to-yellow-500/40" },
      { name: "HTML5", color: "from-orange-500/20 to-orange-500/40" },
      { name: "CSS3 / SCSS", color: "from-cyan-600/20 to-cyan-600/40" },
      { name: "TailwindCSS", color: "from-teal-500/20 to-teal-500/40" },
      { name: "Bootstrap 5", color: "from-indigo-500/20 to-indigo-500/40" },
      { name: "Material UI / Chakra UI / shadcn", color: "from-pink-500/20 to-pink-500/40" },
      { name: "Redux Toolkit / Zustand", color: "from-rose-500/20 to-rose-500/40" },
      { name: "Git / GitHub", color: "from-purple-600/20 to-purple-600/40" },
    ],
  },
  {
    title: "UI/UX & Design",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "Material UI", color: "from-teal-500/20 to-teal-500/40" },
      { name: "Chakra UI", color: "from-pink-500/20 to-pink-500/40" },
      { name: "Framer Motion", color: "from-purple-600/20 to-purple-600/40" },
      { name: "Responsive Design Principles", color: "from-pink-600/20 to-pink-600/40" },
      { name: "UI Component Libraries", color: "from-green-500/20 to-green-500/40" },
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-5 w-5" />,
    skills: [
      { name: "React Native", color: "from-blue-600/20 to-blue-600/40" },
      { name: "Native Modules", color: "from-blue-700/20 to-blue-700/40" },
      { name: "Expo", color: "from-gray-700/20 to-gray-700/40" },
      { name: "Firebase", color: "from-yellow-600/20 to-yellow-600/40" },
    ],
  },
  {
    title: "Backend Knowledge",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Node.js", color: "from-green-600/20 to-green-600/40" },
      { name: "Express.js", color: "from-gray-600/20 to-gray-600/40" },
      { name: "Firebase", color: "from-yellow-600/20 to-yellow-600/40" },
      { name: "GraphQL", color: "from-pink-700/20 to-pink-700/40" },
      { name: "RESTful APIs", color: "from-blue-700/20 to-blue-700/40" },
      { name: "MongoDB", color: "from-green-700/20 to-green-700/40" },
      { name: "MySQL", color: "from-indigo-600/20 to-indigo-600/40" },
      { name: "Sequelize ORM", color: "from-purple-600/20 to-purple-600/40" },
      { name: "Mongoose ODM", color: "from-teal-600/20 to-teal-600/40" },
    ],
  },
  {
    title: "Soft Skills",
    icon: <Users className="h-5 w-5" />,
    skills: [
      { name: "Communication", color: "from-blue-600/20 to-blue-600/40" },
      { name: "Problem Solving", color: "from-green-600/20 to-green-600/40" },
      { name: "Teamwork", color: "from-purple-600/20 to-purple-600/40" },
      { name: "Adaptability", color: "from-orange-600/20 to-orange-600/40" },
      { name: "Time Management", color: "from-yellow-600/20 to-yellow-600/40" },
      { name: "Self-Learning", color: "from-teal-600/20 to-teal-600/40" },
      { name: "Working Under Pressure", color: "from-red-600/20 to-red-600/40" },
    ],
  },
  {
    title: "Other Skills",
    icon: <Globe className="h-5 w-5" />,
    skills: [
      { name: "Testing", color: "from-red-600/20 to-red-600/40" },
      { name: "Performance Optimization", color: "from-yellow-600/20 to-yellow-600/40" },
      { name: "Accessibility", color: "from-green-600/20 to-green-600/40" },
    ],
  },
];


const SkillsSection = () => {

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



        <Tabs defaultValue="Frontend Development" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.title}
                value={category.title}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-500 data-[state=active]:text-white"
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.title} value={category.title}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-6 mt-12">
                {category.skills.map((skill) => (
                  <AnimatedSkillCard
                    key={skill.name}
                    icon={category.icon}
                    title={skill.name}
                    color={skill.color}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
