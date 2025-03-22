import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-deploy-jj0i.onrender.com/api/v1/project/getall",
          { withCredentials: true }
        );
        if (data && data.data) {
          setProjects(data.data);
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
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden py-4 mb-10">
          {/* First copy of projects */}
          <ProjectsTrack projects={projects} />

          {/* Second copy positioned after first for continuous loop */}
          <ProjectsTrack projects={projects} offset={true} />
        </div>
      )}
    </div>
  );
};

// Projects Track component
const ProjectsTrack = ({ projects, offset = false }) => {
  return (
    <motion.div
      className="flex absolute top-0 left-0"
      style={{
        left: offset ? "100%" : 0,
      }}
      animate={{
        x: [0, "-100%"],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      }}
    >
      {projects.map((project, index) => (
        <Card
          key={`${project._id}-${index}`}
          className="w-[280px] md:w-[320px] flex-shrink-0 mx-3 overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <Link to={`/project/${project._id}`}>
            <div className="relative overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[180px] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ArrowUpRight className="text-white h-8 w-8" />
              </div>
            </div>
          </Link>

          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg truncate">
                {project.title}
              </h3>
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
            <p className="text-sm text-muted-foreground mt-1 truncate">
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
                    <Github className="h-4 w-4" />
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
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit</span>
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default Portfolio;
