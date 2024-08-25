import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full justify-center md:justify-end flex mb-6 md:mb-10 md:mr-16 small-regular">
      <Link to={`https://www.themoviedb.org/`} className="flex">
        Powered by{" "}
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="The MOvie Database"
          className="h-2 ml-1.5 md:mr-12 mt-1"
        ></img>
      </Link>
    </footer>
  );
};

export default Footer;
