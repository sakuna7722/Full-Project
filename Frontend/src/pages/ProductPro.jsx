// frontend/src/pages/ProductPro.jsx
import { Link } from "react-router-dom";
import { FaCheckCircle, FaShieldAlt, FaMobileAlt, FaBolt } from "react-icons/fa";
import Footer from "../components/Footer";

// ✅ Reusable Course Card
function CourseCard({ icon, title, instructor, description }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl text-blue-600">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">Instructor: {instructor}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

// ✅ Reusable Stat Card
function StatCard({ value, label }) {
  return (
    <div className="text-center p-6 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-xl shadow">
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

// ✅ Reusable Testimonial Card
function TestimonialCard({ avatar, name, role, text }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full border-4 border-gradient-to-r from-orange-400 to-pink-500 object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">“{text}”</p>
    </div>
  );
}

export default function ProductPro() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto flex-grow">
        {/* ✅ Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-medium inline-block mb-4 shadow">
            Advanced Professional Package
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Master Your Future with{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Professional Courses
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Get access to carefully curated advanced courses designed to give
            you practical skills and real-world results.
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold 
              hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 
              shadow-lg animate-pulse"
          >
            Enroll Now – Start Learning Today 🚀
          </Link>
        </div>

        {/* ✅ Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <CourseCard
            icon="💻"
            title="Full Stack Development"
            instructor="John Doe"
            description="Learn MERN stack from scratch with real-world projects."
          />
          <CourseCard
            icon="🎨"
            title="UI/UX Design"
            instructor="Jane Smith"
            description="Master Figma, design systems, and user psychology."
          />
          <CourseCard
            icon="📊"
            title="Data Science"
            instructor="Amit Kumar"
            description="Python, ML models, and AI applications hands-on."
          />
        </div>

        {/* ✅ Bonus Section */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-10 rounded-3xl mb-20 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-lg"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Exclusive Bonus 🎁</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Enroll now and get lifetime free access to our{" "}
              <span className="font-semibold text-purple-700">
                Career Growth Toolkit
              </span>{" "}
              including resume templates, mock interviews, and mentorship calls.
            </p>
            <Link
              to="/signup"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-all"
            >
              Claim Your Bonus Now 🎉
            </Link>
          </div>
        </div>

        {/* ✅ Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          <StatCard value="6+" label="Courses Included" />
          <StatCard value="50+" label="Hours of Content" />
          <StatCard value="Lifetime" label="Access" />
          <StatCard value="24/7" label="Support" />
        </div>

        {/* ✅ Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Students Say 💬
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
              name="Rahul Sharma"
              role="Software Engineer"
              text="This program changed my career. The instructors are industry experts."
            />
            <TestimonialCard
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
              name="Priya Patel"
              role="UI Designer"
              text="Loved the design course! I landed my first freelance project within a month."
            />
            <TestimonialCard
              avatar="https://randomuser.me/api/portraits/men/46.jpg"
              name="Michael Lee"
              role="Data Analyst"
              text="Hands-on projects helped me crack my interviews. Highly recommended!"
            />
          </div>
        </div>

        {/* ✅ CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 p-10 rounded-3xl text-white shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="mb-6">Join 10,000+ learners already building their future.</p>
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold 
              hover:bg-gray-100 shadow-xl transition-all duration-300"
          >
            Enroll Now 🚀
          </Link>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <FaShieldAlt /> 30-Day Money Back Guarantee
            </div>
            <div className="flex items-center gap-2">
              <FaMobileAlt /> Access on All Devices
            </div>
            <div className="flex items-center gap-2">
              <FaBolt /> Instant Access
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full mb-6"></div>
      <Footer />
    </section>
  );
}
