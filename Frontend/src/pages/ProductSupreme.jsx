import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function ProductSupreme() {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 lg:px-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Affiliate Marketing Mastery
            </h1>
            <div className="w-28 h-2 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto mb-8 rounded-full"></div>

            <p className="text-2xl font-bold text-gray-800 mb-3">
              Price:{" "}
              <span className="text-orange-500 font-extrabold">
                Rs. 2000 + GST
              </span>
            </p>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive affiliate marketing training package designed to
              transform beginners into pros with advanced strategies, multiple
              platforms, and expert mentorship.
            </p>
          </div>

          {/* Course Details Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                What You Will Learn
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: "Affiliate Marketing Training",
                  icon: "📈",
                  gradient: "from-orange-400 to-red-500",
                  points: [
                    "Affiliate Marketing – Concept & Strategy",
                    "Niche & Product Selection",
                    "How to work Like a Pro",
                    "Different Affiliate Platforms – ClickBank, JVZoo, WarriorPlus",
                    "Finding Killer Products",
                    "Marketing & Promotions",
                    "Advanced Strategy of Leads Generation",
                  ],
                },
                {
                  title: "Advance Sales Strategy",
                  icon: "💼",
                  gradient: "from-blue-400 to-purple-500",
                  points: [
                    "How to Pitch your Affiliate Offers",
                    "Objection handling techniques",
                    "Sales Closing Strategies",
                    "Professional Sales Scripts",
                  ],
                },
                {
                  title: "CPA Marketing",
                  icon: "💰",
                  gradient: "from-green-400 to-teal-500",
                  points: [
                    "Basic Concept of CPA Marketing",
                    "CPA Offers from IMC Platform",
                    "Finding Ad Copies",
                    "Keyword Research",
                    "Bing Ads Creation & Optimization",
                    "DFY Landing Page / Funnel",
                    "Bing Ads Coupons for Campaigns",
                  ],
                },
                {
                  title: "Personal Branding",
                  icon: "🌟",
                  gradient: "from-purple-400 to-pink-500",
                  points: [
                    "Build Your Personal Brand Presence",
                    "Niche Clarity & Brand Story",
                    "Brand Positioning & Brand Kit",
                    "Content Strategy",
                    "Content Hygiene Maintenance",
                    "Copywriting Basics",
                  ],
                },
                {
                  title: "Instagram Marketing",
                  icon: "📱",
                  gradient: "from-pink-400 to-red-500",
                  points: [
                    "Organic Lead Generation",
                    "Instagram Hacks for Quality Leads",
                    "Content Creation Mastery",
                    "Advanced Engagement Techniques",
                  ],
                },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${course.gradient} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <span className="text-white text-xl">{course.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {course.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {course.points.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Bonus Section */}
              <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="text-2xl font-bold">Bonus Features</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                    <h4 className="font-semibold mb-1">+5 Bonus Courses</h4>
                    <p className="text-sm text-white text-opacity-90">
                      Worth $999 additional value
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                    <h4 className="font-semibold mb-1">Weekly Live Training</h4>
                    <p className="text-sm text-white text-opacity-90">
                      Direct expert interaction
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                    <h4 className="font-semibold mb-1">Lifetime Updates</h4>
                    <p className="text-sm text-white text-opacity-90">
                      Continuous new content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-6 flex-wrap mt-20">
            <Link
              to="/courses"
              className="px-10 py-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ← Back to Courses
            </Link>
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Enroll Now - Rs. 2000 + GST
            </button>
          </div>

          {/* Trust Badges */}
          <div className="text-center mt-16">
            <div className="flex justify-center gap-10 flex-wrap">
              {[
                "Lifetime Access",
                "Certificate of Completion",
                "Money Back Guarantee",
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-gray-700 text-lg font-medium"
                >
                  <span className="text-2xl mr-2">✅</span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductSupreme;
