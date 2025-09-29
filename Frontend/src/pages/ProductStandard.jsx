// frontend/src/pages/ProductStandard.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function ProductStandard() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* ✅ Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Affiliate Marketing Mastery
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-pink-500 mb-6 rounded-full"></div>

              <p className="text-2xl font-semibold text-gray-800 mb-4">
                Price:{" "}
                <span className="text-orange-500 font-bold">
                  Rs. 2000 + GST
                </span>
              </p>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform from beginner to pro affiliate marketer with our
                comprehensive training program. Learn strategies that actually
                work from industry experts.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/courses"
                  className="px-8 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ← Back to Courses
                </Link>
                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Enroll Now
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Affiliate Marketing Success"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Start Earning Today</h3>
                  <p className="text-orange-300">
                    Proven Strategies • Real Results
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">6+</div>
              <div className="text-gray-600">Expert Trainers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Lessons</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600">Lifetime</div>
              <div className="text-gray-600">Access</div>
            </div>
          </div>

          {/* ✅ Course Details */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What You Will Learn
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Module Cards (Affiliate, Sales, CPA, Branding, Instagram) */}
              {/* 👉 Your existing module code here (unchanged) */}
              {/* Bonus Card */}
              <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-2xl p-6 text-white">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Bonus Courses"
                    className="w-full h-40 object-cover rounded-xl opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-bold">
                      BONUS
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Bonus Features</h3>
                <div className="space-y-3">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <h4 className="font-semibold">+5 Bonus Courses</h4>
                    <p className="text-white text-opacity-90 text-sm">
                      Worth $999 extra value
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <h4 className="font-semibold">Weekly Live Training</h4>
                    <p className="text-white text-opacity-90 text-sm">
                      Direct expert access
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <h4 className="font-semibold">Lifetime Updates</h4>
                    <p className="text-white text-opacity-90 text-sm">
                      New content regularly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Testimonials */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-3xl font-bold text-center mb-8">
              What Our Students Say
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-600 mb-2">
                    "This course transformed my affiliate marketing business.
                    The strategies actually work!"
                  </p>
                  <div className="font-semibold">- Sarah Johnson</div>
                </div>
              </div>
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-600 mb-2">
                    "The practical approach and real-world examples made all the
                    difference. Highly recommended!"
                  </p>
                  <div className="font-semibold">- Mike Chen</div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Final CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Affiliate Marketing Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful students today
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button className="px-10 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Enroll Now - Rs. 2000 + GST
              </button>
              <Link
                to="/courses"
                className="px-10 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}

export default ProductStandard;
