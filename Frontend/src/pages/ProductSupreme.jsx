import { Link } from 'react-router-dom';

function ProductSupreme() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Affiliate Marketing Mastery
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Price: <span className="text-orange-500 font-bold">Rs. 2000 + GST</span>
          </p>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive affiliate marketing training package designed to transform beginners into pros with advanced strategies, multiple platforms, and expert guidance.
          </p>
        </div>

        {/* Course Details Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Will Learn
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Affiliate Marketing Training */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Affiliate Marketing Training</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Affiliate Marketing – Concept & Strategy",
                  "Niche & Product Selection",
                  "How to work Like a Pro",
                  "Different Affiliate Platforms – ClickBank, JVZoo, WarriorPlus",
                  "Finding Killer Products beyond these Affiliate Platforms",
                  "Marketing & Promotions of Affiliate Offers",
                  "Advanced Strategy of Leads Generation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advance Sales Strategy */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Advance Sales Strategy</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "How to Pitch your Affiliate Offers",
                  "Objection handling",
                  "Sales Closing",
                  "Sales script"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CPA Marketing */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">CPA Marketing</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Basic Concept of CPA Marketing",
                  "How to get CPA Offers from IMC Platform",
                  "How to find Ad Copies",
                  "Relevant Keywords Research",
                  "How to Create Bing Ads",
                  "How to Optimize Bing ads",
                  "DFY Landing Page / Sales Funnel Module",
                  "How to get Bing Ads Coupons for Initial Campaigning"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Branding */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">🌟</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Personal Branding</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "How to Build Your Personal Brand Presence",
                  "How to get the Niche Clarity",
                  "How to Create Brand Story",
                  "How to Position you Brand",
                  "How to Create Brand Kit",
                  "Content Creation for Personal Branding",
                  "How to maintain Content Hygiene",
                  "Basics of Copywriting"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Marketing */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Instagram Marketing</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Organic Lead Generation",
                  "Instagram hacks to attract Quality Leads",
                  "Content Creation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonus Features */}
            <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-2xl font-bold">Bonus Features</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">+ 5 Bonus Courses</h4>
                  <p className="text-white text-opacity-90">Worth $999 additional value</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Weekly Live Training</h4>
                  <p className="text-white text-opacity-90">Direct interaction with experts</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Continuous Updates</h4>
                  <p className="text-white text-opacity-90">New courses and materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 flex-wrap mt-16">
          <Link
            to="/courses"
            className="px-8 py-4 rounded-2xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Back to Courses
          </Link>
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Enroll Now - Rs. 2000 + GST
          </button>
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-12">
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center text-gray-600">
              <span className="text-2xl mr-2">✅</span>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-2xl mr-2">✅</span>
              <span>Certificate of Completion</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-2xl mr-2">✅</span>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSupreme;