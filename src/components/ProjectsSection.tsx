import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string[];
  liveUrl?: string;
  githubUrl?: string;
};

const ProjectsSection = () => {
  const { theme } = useTheme();

  const projects: Project[] = [
    {
      id: 1,
      title: "New Goat Dashboard - Football Tryouts & Social Media Management",
      description:
        "A comprehensive dashboard application that bridges football clubs and players, offering tools for managing campaigns, analyzing player performance, and controlling the football social media platform.",
      image: theme === "dark" ? "/goat-white-logo.png" : "/goat-logo.png",
      tags: ["React", "Firebase", "Zustand", "Tailwind CSS"],
      category: ["Web"],
    },
    {
      id: 5,
      title: "Football Social Media App - Engage, Share, Compete",
      description:
        "A dynamic mobile app that enables football players, teams, and fans to share posts, videos, shots, and interact in a social environment, similar to Instagram Reels but tailored for football enthusiasts.",
      image: "/placeholder.svg",
      tags: ["React Native", "Firebase", "Real-Time", "Tailwind CSS", "Expo"],
      category: ["Mobile"],
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.xtend.newgoat",
    },
    {
      id: 345,
      title: "Skyline Digital Solutions",
      description:
        "A professional website for a Germany-based digital agency offering custom web development, modern UI design, backend solutions, and email integration. Built to showcase their services and enhance client engagement with a sleek, responsive interface.",
      image: "/placeholder.svg",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "Shadcn",
        "Web Hosting",
        "Hostinger",
        "Email Integration",
      ],
      category: ["Web"],
      liveUrl: "https://skylinedigitalsolution.de/",
    },
    {
      id: 2,
      title: "Idify Dashboard",
      description:
        "A professional services dashboard designed to manage and control the IDify app, featuring multilingual support, real-time notifications, and sales/customer statistics.",
      image: "/idify-logo.webp",
      tags: ["Next.js", "Firebase", "Tiptap", "Chart.js", "Redux", "Shadcn"],
      category: ["Web"],
    },

    {
      id: 65,
      title: "Valuefinx",
      description:
        "Valuefinx builds advanced software tools for financial institutions, focusing on solutions for corporate governance, capital markets, and investment management. The company delivers industry-specific technology and data to support business growth and digital transformation.",
      image: "/placeholder.svg",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: ["Web"],
      liveUrl: "https://www.valuefinx.com/",
    },
    {
      id: 365,
      title: "Tukey Data Solutions",
      description:
        "Tukey Data Solutions is a financial data company inspired by statistician John W. Tukey. It focuses on providing accurate, affordable, and accessible data services, with a strong presence in North America.",
      image: "/placeholder.svg",
      tags: ["Next.js", "Tailwind CSS", "Resposive Design", "Animation"],
      category: ["Web"],
      liveUrl: "https://tukeydata.com/",
    },
    {
      id: 3,
      title: "Bazar Frontend - E-Commerce Platform",
      description:
        "A responsive MERN-based e-commerce frontend with a sleek UI, admin dashboard for product and order management, dynamic product filtering, and real-time updates. Includes authentication and role-based access.",
      image: "/placeholder.svg",
      tags: ["React", "Redux", "React-Query", "Tailwind CSS", "Vite"],
      category: ["Web"],
      liveUrl: "https://arius02.github.io/ecommerce-react.js/",
      githubUrl: "https://github.com/Arius02/ecommerce-react.js",
    },
    {
      id: 4,
      title: "Bazar Backend - E-Commerce API",
      description:
        "A robust Node.js/Express backend with MongoDB, featuring full CRUD operations, secure authentication (JWT), payment integration, order confirmation emails, and sales reports. Supports complete order lifecycle and user management.",
      image: "/bazar.svg",
      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Nodemailer",
        "Stripe",
        "REST API",
      ],
      category: ["Web"],
      githubUrl: "https://github.com/Arius02/ecommerce-node.js",
    },
    {
      id: 143,
      title: "Personal Budget Tracker",
      description:
        "A budgeting app built with React, Material UI, and Redux to manage personal expenses and visualize financial data.",
      tags: ["React", "Redux", "Material UI"],
      category: ["Web", "Learning Journey"],
      image: "/images/project-1.png",
      liveUrl: "https://arius02.github.io/PBT/",
      githubUrl: "https://github.com/Arius02/PBT",
    },
    {
      id: 567,
      title: "SnapUp - E-Commerce Frontend",
      description:
        "An e-commerce UI built with React, Redux, TailwindCSS, and API handling for dynamic product views and user interaction.",
      tags: ["React", "Redux", "TailwindCSS", "API"],
      category: ["Web", "Learning Journey"],
      image: "/images/project-5.png",
      liveUrl: "https://arius02.github.io/SnapUp/",
      githubUrl: "https://github.com/Arius02/SnapUp",
    },
    {
      id: 4463,
      title: "YouTube Clone",
      description:
        "A React-based YouTube clone that integrates API handling and Material UI to mimic core video browsing features.",
      tags: ["React", "Material UI", "API"],
      category: ["Web", "Learning Journey"],
      image: "/placeholder.svg",
      liveUrl: "https://arius02.github.io/youtubeClone/#/",
      githubUrl: "https://github.com/Arius02/youtubeClone",
    },
    {
      id: 7546,
      title: "Saraha - Anonymous Feedback Backend",
      description:
        "A backend for an anonymous messaging app using Node.js, Express, and MongoDB, built for secure and scalable feedback submission.",
      tags: ["Node.js", "Express", "MongoDB", "Backend"],
      category: ["Web", "Learning Journey"],
      image: "/sarahah.png",
      githubUrl: "https://github.com/Arius02/saraha",
    },
    {
      id: 322,
      title: "Yummy - Meal API App",
      description:
        "Built with HTML, CSS, and JavaScript to interact with a meals API, allowing users to search, filter, and view meal details.",
      tags: ["JavaScript", "API", "HTML", "CSS"],
      category: ["Web", "Learning Journey"],
      image: "/placeholder.svg",
      liveUrl: "https://arius02.github.io/yummy/",
      githubUrl: "https://github.com/Arius02/yummy",
    },
    {
      id: 656,
      title: "Animated Template",
      description:
        "Creative HTML/CSS/JS template with detailed animations and transitions for visual storytelling.",
      tags: ["HTML", "CSS", "JavaScript", "Animations"],
      category: ["Web", "Learning Journey"],
      image: "/placeholder.svg",
      liveUrl: "https://arius02.github.io/Elzero-3/",
      githubUrl: "https://github.com/Arius02/Elzero-3",
    },
    {
      id: 763,
      title: "Company Template with Animations",
      description:
        "A business-themed HTML/CSS template enhanced with Bootstrap and powerful scroll-based animations.",
      tags: ["HTML", "CSS", "Bootstrap", "Animation"],
      category: ["Web", "Learning Journey"],
      image: "/placeholder.svg",
      liveUrl: "https://arius02.github.io/flex/",
      githubUrl: "https://github.com/Arius02/flex",
    },
  ];

  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web", "Mobile", "Learning Journey"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category.includes(filter));

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Check out some of my recent projects showcasing my skills in React
            and React Native development.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card overflow-hidden border-border flex flex-col relative z-20"
            >
              <div className="relative overflow-hidden h-48">
                {project.liveUrl ? (
                  <Image
                    src={`https://api.microlink.io/?url=${encodeURIComponent(
                      project.liveUrl
                    )}&screenshot=true&meta=false&embed=screenshot.url`}
                    alt={project.title}
                    className="project-image w-full h-full object-cover"
                    width={240}
                    height={192}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className=" w-full h-full object-contain"
                    width={240}
                    height={192}
                  />
                )}
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between px-6 pb-6 pt-0 mt-auto">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github size={16} className="mr-1" />
                      Source Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
