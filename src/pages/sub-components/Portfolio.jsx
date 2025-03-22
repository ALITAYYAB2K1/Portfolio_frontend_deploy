import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import "./portfolio.css"; // We'll create this CSS file
const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-deploy-jj0i.onrender.com/api/v1/project/getall",
          { withCredentials: true }
        );
        if (data && data.data) {
          setProjects(data.data);
          // Get deployed projects for the carousel
          const deployed = data.data.filter((p) => p.deployed === "Yes");
          setFeaturedProjects(
            deployed.length > 0 ? deployed : data.data.slice(0, 6)
          );
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">PROJECTS</span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Project Scrolling Carousel */}
          <div className="mb-16 overflow-hidden relative">
            <h2 className="text-xl font-medium mb-6">Featured Projects</h2>
            <div className="project-carousel">
              <div className="project-track">
                {/* First copy of featured projects */}
                {featuredProjects.map((project) => (
                  <ProjectCard key={`first-${project._id}`} project={project} />
                ))}

                {/* Second copy for seamless loop */}
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={`second-${project._id}`}
                    project={project}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <span className="text-sm text-muted-foreground">
                ← Scroll horizontally to explore more →
              </span>
            </div>
          </div>

          <h2 className="text-xl font-medium mb-6">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(viewAll ? projects : projects.slice(0, 9)).map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <Link to={`/project/${project._id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto aspect-video object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg truncate">
                      {project.title}
                    </h3>
                    <Badge
                      variant={
                        project.deployed === "Yes"
                          ? "success"
                          : project.deployed === "Upcoming"
                          ? "warning"
                          : "destructive"
                      }
                      className={`${
                        project.deployed === "Yes"
                          ? "bg-green-100 text-green-800"
                          : project.deployed === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {project.deployed}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.stack}
                  </p>

                  <div className="mt-4 flex gap-3">
                    {project.gitRepoUrl && (
                      <a
                        href={project.gitRepoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="rounded-[30px] flex items-center gap-2 flex-row"
                          variant="outline"
                          size="sm"
                        >
                          <span>
                            <Github className="h-4 w-4" />
                          </span>
                          <span>Github</span>
                        </Button>
                      </a>
                    )}

                    {project.deployed === "Yes" && project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="rounded-[30px] flex items-center gap-2 flex-row"
                          size="sm"
                        >
                          <span>
                            <ExternalLink className="h-4 w-4" />
                          </span>
                          <span>Visit</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {projects && projects.length > 9 && (
            <div className="w-full text-center my-9">
              <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
                {viewAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Project Card for the carousel
const ProjectCard = ({ project }) => {
  return (
    <Card className="carousel-card flex-shrink-0 w-[280px] md:w-[320px] overflow-hidden mx-3">
      <Link to={`/project/${project._id}`}>
        <div className="relative group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[180px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ArrowUpRight className="text-white h-8 w-8" />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold truncate">{project.title}</h3>
          <Badge
            className={`${
              project.deployed === "Yes"
                ? "bg-green-100 text-green-800"
                : project.deployed === "Upcoming"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {project.deployed}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {project.stack}
        </p>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
