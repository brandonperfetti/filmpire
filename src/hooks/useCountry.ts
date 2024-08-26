import { useEffect, useState } from "react";

function useCountry() {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const storedCountryCode = localStorage.getItem("countryCode");

    if (storedCountryCode) {
      // If the country code is in local storage, use it
      setCountryCode(storedCountryCode);
    } else {
      // Fetch the country code if not found in local storage
      const fetchCountry = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const countryCode = data.country_code;
          setCountryCode(countryCode);
          localStorage.setItem("countryCode", countryCode);
        } catch (error) {
          console.error("Error fetching country:", error);
        }
      };

      fetchCountry();
    }
  }, []);

  return countryCode;
}

export default useCountry;
