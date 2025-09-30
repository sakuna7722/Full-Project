//Frontend/src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-600 text-white relative overflow-hidden">
      {/* gradient animation background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-600 opacity-40 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="text-yellow-400 text-2xl">💡</span> NextGenCoders
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Get ahead in your career with NextGenCoders, the one-stop solution for
            your educational needs. Connect with top industry professionals and
            fuel your passion for success.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl">
            {[
              { src: "/icons/Facebook.webp", link: "#" },
              { src: "/icons/x.webp", link: "#" },
              // { src: "/icons/instagram.jpeg", link: "#" },
              // { src: "/icons/o.jpeg", link: "#" },
              { src: "/icons/link.webp", link: "#" },
              // { src: "/icons/jr.jpeg", link: "#" },
              // { src: "/icons/15", link: "https://wa.me/1234567890" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="transform transition-all duration-300 hover:scale-125 hover:rotate-6 hover:drop-shadow-[0_0_10px_#facc15]"
              >
                <img
                  src={item.src}
                  alt={`icon-${i}`}
                  className="w-8 h-8 object-contain"
                />
              </a>
            ))}
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h4 className="
      text-lg font-semibold mb-4 relative
      after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-yellow-400 after:rounded-full after:w-10
      hover:after:w-full after:transition-all after:duration-300
    ">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            {[
              { name: "FAQ’s", to: "/faq" },
              { name: "Privacy Policy", to: "/privacy-policy" },
              { name: "Terms & Conditions", to: "/terms#" },
              { name: "End User Agreement", to: "/affiliate-agreement" },
              // { name: "Disclaimer", to: "/disclaimer" },
              // { name: "Membership", to: "/membership" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="relative inline-block transition-colors duration-300 hover:text-yellow-400
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-yellow-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="
      text-lg font-semibold mb-4 relative
      after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-yellow-400 after:rounded-full after:w-10
      hover:after:w-full after:transition-all after:duration-300
    ">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            {[
              { name: "Blog", to: "/blog" },
              { name: "About Us", to: "/auth/about-us" },
              { name: "Contact Us", to: "/auth/contact-us" },
              { name: "Refund Policy", to: "/refund-policy" },
              // { name: "Sitemap", to: "/sitemap" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="relative inline-block transition-colors duration-300 hover:text-yellow-400
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-yellow-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses Package */}
        <div>
          <h4 className="
      text-lg font-semibold mb-4 relative
      after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-yellow-400 after:rounded-full after:w-10
      hover:after:w-full after:transition-all after:duration-300
    ">
            Courses Package
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            {[
              { name: "Bronze Bundle", to: "/bronze" },
              { name: "Silver Package", to: "/silver" },
              { name: "Gold Package", to: "/gold" },
              { name: "Platinum Package", to: "/platinum" },
              { name: "Diamond Package", to: "/diamond" },
              { name: "NextGenCoders Startup Package", to: "/#" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="relative inline-block transition-colors duration-300 hover:text-yellow-400
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-yellow-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-purple-500 text-center py-4 text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-300">
        © 2025 NextGenCoders. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
