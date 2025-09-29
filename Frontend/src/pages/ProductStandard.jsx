import { Link } from 'react-router-dom';

function ProductSupreme() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Affiliate Marketing Mastery
            </h1>
            <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-pink-500 mb-6 rounded-full"></div>
            
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Price: <span className="text-orange-500 font-bold">Rs. 2000 + GST</span>
            </p>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform from beginner to pro affiliate marketer with our comprehensive training program. Learn strategies that actually work from industry experts.
            </p>

            <div className="flex gap-4">
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
                <p className="text-orange-300">Proven Strategies • Real Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
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

        {/* Course Details Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Will Learn
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Affiliate Marketing Training */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Affiliate Marketing"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">Module 1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Affiliate Marketing Training</h3>
              <ul className="space-y-2">
                {[
                  "Affiliate Marketing – Concept & Strategy",
                  "Niche & Product Selection",
                  "How to work Like a Pro",
                  "Different Affiliate Platforms",
                  "Finding Killer Products",
                  "Marketing & Promotions",
                  "Advanced Leads Generation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sales Strategy */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Sales Strategy"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Module 2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Advance Sales Strategy</h3>
              <ul className="space-y-2">
                {[
                  "How to Pitch your Affiliate Offers",
                  "Objection handling techniques",
                  "Sales Closing strategies",
                  "Professional Sales scripts"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CPA Marketing */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="CPA Marketing"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Module 3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">CPA Marketing</h3>
              <ul className="space-y-2">
                {[
                  "Basic Concept of CPA Marketing",
                  "CPA Offers from IMC Platform",
                  "Finding Ad Copies",
                  "Keywords Research",
                  "Bing Ads Creation & Optimization",
                  "Landing Page/Sales Funnel",
                  "Bing Ads Coupons"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Branding */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Personal Branding"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Module 4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Branding</h3>
              <ul className="space-y-2">
                {[
                  "Build Personal Brand Presence",
                  "Niche Clarity & Brand Story",
                  "Brand Positioning & Brand Kit",
                  "Content Creation Strategy",
                  "Content Hygiene Maintenance",
                  "Copywriting Basics"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Marketing */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Instagram Marketing"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">Module 5</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instagram Marketing</h3>
              <ul className="space-y-2">
                {[
                  "Organic Lead Generation",
                  "Instagram hacks for Quality Leads",
                  "Content Creation Mastery",
                  "Advanced Engagement Techniques"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonus Section */}
            <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-2xl p-6 text-white">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Bonus Courses"
                  className="w-full h-40 object-cover rounded-xl opacity-90"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-bold">BONUS</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Bonus Features</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">+5 Bonus Courses</h4>
                  <p className="text-white text-opacity-90 text-sm">Worth $999 extra value</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Weekly Live Training</h4>
                  <p className="text-white text-opacity-90 text-sm">Direct expert access</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Lifetime Updates</h4>
                  <p className="text-white text-opacity-90 text-sm">New content regularly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">What Our Students Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Student"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-600 mb-2">"This course transformed my affiliate marketing business. The strategies actually work!"</p>
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
                <p className="text-gray-600 mb-2">"The practical approach and real-world examples made all the difference. Highly recommended!"</p>
                <div className="font-semibold">- Mike Chen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Affiliate Marketing Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of successful students today</p>
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
  );
}

export default ProductSupreme;