import React from "react";
import { Code, Smartphone, Monitor, ScreenShare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutSection = () => {
  const services = [
    {
      icon: <Monitor className="h-8 w-8 text-purple-600" />,
      title: "Full-Stack Web Development",
      description:
        "Building robust and scalable applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) with clean and maintainable code.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-teal-500" />,
      title: "Cross-Platform Mobile Development",
      description:
        "Developing smooth, high-performance mobile apps with React Native for both Android and iOS platforms.",
    },
    {
      icon: <Code className="h-8 w-8 text-purple-600" />,
      title: "Admin Panels & Dashboards",
      description:
        "Creating feature-rich dashboards using Next.js, Firebase, and real-time data handling for enterprise and government applications.",
    },
    {
      icon: <ScreenShare className="h-8 w-8 text-teal-500" />,
      title: "Responsive UI & Frontend Design",
      description:
        "Crafting intuitive, responsive user interfaces using React.js, Tailwind CSS, and modern UI libraries like Material UI and shadcn for a seamless experience.",
    },
  ];

  return (
    <section id="about" className="py-20 relative ">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            I’m a detail-oriented Frontend Developer from Egypt with a
            background in Biochemical Sciences and a growing passion for tech.
            Over the past few years, I’ve transitioned into web development,
            focusing heavily on React and the modern JavaScript ecosystem. I
            thrive in environments where I can solve problems, learn rapidly,
            and collaborate with others to build tools that people genuinely
            enjoy using.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">My Background</h3>
            <p className="text-muted-foreground">
              My journey into tech began from a rather unconventional starting
              point — the world of biochemistry. I graduated from the Faculty of
              Science at Al-Azhar University, where I studied Biochemical
              Sciences from 2020 to 2024. While the discipline taught me
              analytical thinking, research skills, and attention to detail, I
              discovered along the way that my true passion lay in building
              things — especially with code.
            </p>
            <p className="text-muted-foreground">
              Driven by curiosity, I started learning web development during my
              university years. What began as a hobby quickly evolved into a
              career path. I dove deep into the JavaScript ecosystem, focusing
              on frameworks like React and Next.js, and began building
              full-stack applications using the MERN stack. Through consistent
              learning, real-world projects, and hands-on problem solving, I
              transitioned into the tech industry as a frontend developer.
            </p>
            <p className="text-muted-foreground">
              I currently work as a Frontend Developer at Xtend, where I&lsquo;ve
              contributed to impactful projects ranging from football analytics
              platforms to government-backed document management dashboards.
              Beyond my professional work, I’ve also been an active volunteer
              for organizations like Ressala and Sonnaa Elhayah, reflecting my
              belief in community-driven growth.
              <br />
              Coming from a non-traditional background has shaped me into a
              versatile developer — one who’s not afraid to ask questions, learn
              fast, and think creatively. I bring that mindset into every
              project I touch.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">My Approach</h3>
            <p className="text-muted-foreground">
              I approach development with a focus on creating user-friendly,
              high-performance web applications. I believe that effective
              software starts with understanding the problem, so I take time to
              research and ensure my solutions align with both user needs and
              business goals.
            </p>
            <p className="text-muted-foreground">
              I value collaboration and communication, believing that clear,
              consistent feedback and teamwork lead to the best results. My
              coding practices prioritize clean, maintainable, and scalable
              code, while also considering performance, security, and
              accessibility. Testing is a key part of my workflow to ensure
              reliability and quality.
            </p>
            <p className="text-muted-foreground">
              In everything I do, I aim to deliver solutions that are not only
              functional but impactful, blending technical expertise with a
              user-centered mindset.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">What I Do</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 border-border relative z-20"
              >
                <CardHeader className="pb-2">
                  <div className="mb-2">{service.icon}</div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
