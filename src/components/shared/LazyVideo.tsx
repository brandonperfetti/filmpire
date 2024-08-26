import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path if necessary
import { useEffect, useRef, useState } from "react";

const LazyVideo = ({
  videoKey,
  title,
}: {
  videoKey: string;
  title: string;
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = videoRef.current; // Store the current ref value

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={videoRef}
      className="relative w-fit md:w-full h-[300px] md:h-[500px] rounded"
    >
      {isVisible ? (
        <>
          {!isLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded" />
          )}
          <iframe
            className="w-full h-full rounded"
            title={title}
            src={`https://www.youtube.com/embed/${videoKey}`}
            allow="fullscreen"
            onLoad={() => setIsLoaded(true)}
            style={{ visibility: isLoaded ? "visible" : "hidden" }} // Hide iframe until loaded
          />
        </>
      ) : (
        <Skeleton className="w-full h-full rounded" />
      )}
    </div>
  );
};

export default LazyVideo;
