import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/ui/card";
import { motion } from "framer-motion";

function Apps() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getApps = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://portfolio-backend-deploy-jj0i.onrender.com/api/v1/softwareapplications/getall",
          {
            withCredentials: true,
          }
        );
        if (data && data.data) {
          setApps(data.data);
        }
      } catch (error) {
        console.error("Error fetching apps:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getApps();
  }, []);

  if (apps.length === 0 && !isLoading) {
    return <div>No apps found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        MY APPS
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden py-4">
          {/* First row - Left to Right */}
          <AppsTrack apps={apps} />

          {/* Second copy positioned after first for continuous loop */}
          <AppsTrack apps={apps} offset={true} />

          {/* Optional: Second row in opposite direction */}
          {apps.length > 5 && (
            <div className="mt-10 relative w-full overflow-hidden">
              <ReverseAppsTrack apps={apps} />
              <ReverseAppsTrack apps={apps} offset={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Apps Track component (Left to Right)
const AppsTrack = ({ apps, offset = false }) => {
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
          duration: 25,
          ease: "linear",
        },
      }}
    >
      {apps.map((app, index) => (
        <Card
          className="h-fit w-32 sm:w-40 p-7 flex-shrink-0 mx-3 flex flex-col justify-center items-center gap-3"
          key={`${app._id}-${index}`}
        >
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <img
              src={app.svg}
              alt={app.name}
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-center text-sm truncate w-full">
            {app.name}
          </p>
        </Card>
      ))}
    </motion.div>
  );
};

// Reverse Apps Track component (Right to Left)
const ReverseAppsTrack = ({ apps, offset = false }) => {
  return (
    <motion.div
      className="flex absolute top-0 right-0"
      style={{
        right: offset ? "100%" : 0,
      }}
      animate={{
        x: [0, "100%"],
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
      {[...apps].reverse().map((app, index) => (
        <Card
          className="h-fit w-32 sm:w-40 p-7 flex-shrink-0 mx-3 flex flex-col justify-center items-center gap-3"
          key={`reverse-${app._id}-${index}`}
        >
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <img
              src={app.svg}
              alt={app.name}
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-center text-sm truncate w-full">
            {app.name}
          </p>
        </Card>
      ))}
    </motion.div>
  );
};

export default Apps;
