//Frontend/src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const refCode = localStorage.getItem("referralCode");

  // const appendRef = (path) => (refCode ? `${path}?ref=${refCode}` : path);
  const appendRef = (path) => {
    const generatedPath = refCode ? `${path}?ref=${refCode}` : path;
    console.log("refCode:", refCode);
    console.log("Generated path:", generatedPath);
    return generatedPath;
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 md:px-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">
          <Link to={appendRef("/")}>NextGenCoders</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to={appendRef("/courses")}
            className="text-gray-600 hover:text-orange-500 transition"
          >
            Our Courses ▼
          </Link>
          <Link
            to={appendRef("/auth/about-us")}
            className="text-gray-600 hover:text-orange-500 transition"
          >
            About Us
          </Link>
          <Link
            to={appendRef("/auth/contact-us")}
            className="text-gray-600 hover:text-orange-500 transition"
          >
            Contact Us
          </Link>

          <Link
            to={appendRef("/auth/login")}
            className="text-gray-800 font-medium underline underline-offset-2 hover:text-orange-500 transition"
          >
            Log in
          </Link>

          <Link
            to={appendRef("/auth/signup")}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-md font-semibold shadow hover:from-orange-500 hover:to-orange-600 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-gray-100"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to={appendRef("/auth/login")}
              className="text-gray-800 font-medium underline underline-offset-2 hover:text-orange-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>



            <Link
              to={appendRef("/auth/signup")}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md font-semibold shadow hover:from-orange-500 hover:to-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>

            <Link
              to={appendRef("/")}
              className="text-gray-600 hover:text-orange-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              to={appendRef("/courses")}
              className="text-gray-600 hover:text-orange-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Our Courses ▼
            </Link>

            <Link
              to={appendRef("/auth/about-us")}
              className="text-gray-600 hover:text-orange-500 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            <Link
              to={appendRef("/auth/contact-us")}
              className="text-gray-600 hover:text-orange-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
