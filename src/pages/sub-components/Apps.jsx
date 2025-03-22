import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/ui/card";
import "./apps.css"; // We'll create this CSS file

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
        <div className="overflow-hidden relative py-4">
          {/* First row - Left to Right */}
          <div className="apps-carousel">
            <div className="apps-track">
              {/* First copy */}
              {apps.map((app) => (
                <AppCard key={`first-${app._id}`} app={app} />
              ))}

              {/* Second copy for seamless loop */}
              {apps.map((app) => (
                <AppCard key={`second-${app._id}`} app={app} />
              ))}
            </div>
          </div>

          {/* Optional: Second row in opposite direction */}
          {apps.length > 5 && (
            <div className="apps-carousel mt-4">
              <div className="apps-track-reverse">
                {/* First copy */}
                {[...apps].reverse().map((app) => (
                  <AppCard key={`reverse-first-${app._id}`} app={app} />
                ))}

                {/* Second copy for seamless loop */}
                {[...apps].reverse().map((app) => (
                  <AppCard key={`reverse-second-${app._id}`} app={app} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// App Card component
const AppCard = ({ app }) => {
  return (
    <Card className="app-card h-fit p-7 mx-3 flex flex-col justify-center items-center gap-3 flex-shrink-0">
      <img src={app.svg} alt={app.name} className="h-12 sm:h-24 w-auto" />
      <p className="text-muted-foreground text-center">{app.name}</p>
    </Card>
  );
};

export default Apps;
