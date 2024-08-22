import { createSessionId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ApprovedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved");

    const checkSessionAndNavigate = async () => {
      if (approved === "true" && requestToken) {
        try {
          // Call the createSessionId function to finalize the session creation
          await createSessionId();

          // Wait until the session ID is available in local storage
          const sessionCheckInterval = setInterval(() => {
            const sessionId = localStorage.getItem("session_id");
            if (sessionId) {
              clearInterval(sessionCheckInterval); // Stop checking
              setLoading(false); // Update loading state
              navigate("/"); // Redirect to the homepage after successful authentication
            }
          }, 500); // Check every 500ms

          // Set a timeout to prevent infinite checking
          setTimeout(() => {
            clearInterval(sessionCheckInterval);
            setLoading(false);
            navigate("/"); // Redirect regardless after timeout
          }, 10000); // 10-second timeout
        } catch (error) {
          console.error("Session creation failed:", error);
          setLoading(false);
          navigate("/"); // Redirect on failure
        }
      } else {
        // If not approved, redirect to the homepage
        setLoading(false);
        navigate("/");
      }
    };

    checkSessionAndNavigate();
  }, [location, navigate]);

  return (
    <div>{loading ? "Authenticating, please wait..." : "Redirecting..."}</div>
  );
};

export default ApprovedPage;
