import React from "react";
import { Link } from "react-router-dom";
import Courses from "../pages/Courses";

function Hero() {
  return (
    <div className="bg-gray-50">

      {/* ================= HERO TITLE ================= */}
      <section className="py-20 px-6 text-center bg-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Our Exclusive Packages{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            leadsgurukul
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          With our exclusive packages, you get industry-leading training created  
          by top experts. Learn, grow, and empower your future with practical skills.
        </p>
      </section>

      {/* ================= ALL COURSES ================= */}
      <Courses isLoggedIn={false} />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 px-6 md:px-10 bg-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Real Projects",
              desc: "Work on real-world projects and hands-on tasks that prepare you for jobs.",
            },
            {
              title: "Expert Mentors",
              desc: "Learn directly from top professionals experienced in the tech industry.",
            },
            {
              title: "Affordable Pricing",
              desc: "High-quality education at the best price, including lifetime access.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl font-extrabold">
          Start Your Learning Journey Today
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Join thousands of learners and start building real digital skills.
        </p>

        <Link
          to="/auth/signup"
          className="mt-8 inline-block bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition-all duration-300"
        >
          Sign Up Now ✨
        </Link>
      </section>
    </div>
  );
}

export default Hero;
