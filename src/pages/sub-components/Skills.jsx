import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/ui/card";
import { motion } from "framer-motion";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSkills = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://portfolio-backend-deploy-jj0i.onrender.com/api/v1/skill/getall",
          {
            withCredentials: true,
          }
        );
        setSkills(data.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSkills();
  }, []);

  // Duplicate skills array to create continuous looping effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit"
      >
        SKILLS
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="w-full overflow-hidden py-4">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {duplicatedSkills.map((element, index) => (
              <Card
                className="h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 mx-3 p-4 flex flex-col justify-center items-center gap-2"
                key={`${element._id}-${index}`}
              >
                <div className="h-16 sm:h-20 flex items-center justify-center">
                  <img
                    src={element.svg}
                    alt={element.title}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <p className="text-muted-foreground text-center text-sm truncate w-full">
                  {element.title}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Skills;
