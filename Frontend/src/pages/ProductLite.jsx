import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaShieldAlt, FaMobileAlt, FaBolt } from "react-icons/fa";

function ProductLite() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Perfect for Beginners
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Freelancing
            </h1>

            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto mb-6 rounded-full"></div>

            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Price: <span className="text-orange-500">Rs. 2000 + GST</span>
            </p>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Kickstart your freelancing journey with essential skills, proven
              strategies, and expert guidance designed for beginners.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 mb-8 border border-gray-100">
            {/* What You Will Learn Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What You Will Learn
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Organic Lead Generation",
                  icon: "📈",
                  desc: "Attract clients naturally without paid ads",
                },
                {
                  title: "Social Media Marketing",
                  icon: "💬",
                  desc: "Leverage platforms to find clients",
                },
                {
                  title: "Personal Branding",
                  icon: "🌟",
                  desc: "Build your unique professional identity",
                },
                {
                  title: "Attraction Marketing",
                  icon: "🎯",
                  desc: "Make clients come to you automatically",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bonus Features */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Bonus Features Included
                </h3>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl text-white">🎁</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    LeadsArk Affiliate Training
                  </h4>
                  <p className="text-sm text-gray-600">
                    Recordings of Previous Weekly Training Sessions
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl text-white">🔴</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Weekly Live Training
                  </h4>
                  <p className="text-sm text-gray-600">
                    Real-time interaction with experts
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600 font-bold text-sm">
                  Lifetime Access
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-green-600 font-bold text-sm">
                  Certificate
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-purple-600 font-bold text-sm">Support</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-orange-600 font-bold text-sm">Updates</div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                What Students Say
              </h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-gray-600 italic mb-2">
                  "This course gave me the confidence to start my freelancing
                  career. The step-by-step approach made everything clear!"
                </p>
                <div className="font-semibold text-gray-800">- Rohan Sharma</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              to="/courses"
              className="px-8 py-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <span>←</span> Back to Courses
            </Link>

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse">
              Enroll Now - Rs. 2000 + GST
            </button>
          </div>

          {/* Trust Badges */}
          <div className="text-center mt-8">
            <div className="flex justify-center gap-6 flex-wrap text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-500" /> 30-Day Money Back
                Guarantee
              </div>
              <div className="flex items-center gap-2">
                <FaBolt className="text-green-500" /> Instant Access
              </div>
              <div className="flex items-center gap-2">
                <FaMobileAlt className="text-green-500" /> Mobile Friendly
              </div>
            </div>
          </div>

          {/* Gradient Separator */}
          <div className="h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full mt-12 mb-6"></div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductLite;
