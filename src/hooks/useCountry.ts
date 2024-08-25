import { useEffect, useState } from "react";

function useCountry() {
  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setCountryCode(data.country_code);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  return countryCode;
}

export default useCountry;
