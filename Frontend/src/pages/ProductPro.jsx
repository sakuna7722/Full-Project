import { Link } from 'react-router-dom';

function ProductPro() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            Advanced Professional Package
          </span>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Upskilling Courses
          </h1>
          
          <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-6 rounded-full"></div>

          <p className="text-3xl font-bold text-gray-800 mb-4">
            Price: <span className="text-orange-500">Rs. 2000 + GST</span>
          </p>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master in-demand skills with our comprehensive professional package featuring 6 expert-led courses and exclusive bonuses.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Affiliate Marketing Training",
              instructor: "Ayaz Mohammad",
              icon: "📈",
              color: "from-orange-400 to-red-500",
              items: [
                "Affiliate Marketing – Concept & Strategy",
                "Niche & Product Selection",
                "How to work Like a Pro",
                "Different Affiliate Platforms",
                "Finding Killer Products",
                "Marketing & Promotions",
                "Advanced Leads Generation",
              ],
            },
            {
              title: "Sales Training",
              instructor: "Ayaz Mohammad",
              icon: "💼",
              color: "from-blue-400 to-purple-500",
              items: [
                "Advance Sales Strategy",
                "How to Pitch your Offers",
                "Objection Handling",
                "Sales Closing",
                "Sales Script",
              ],
            },
            {
              title: "CPA Marketing Training",
              instructor: "Shabbir Ahmed Khan",
              icon: "💰",
              color: "from-green-400 to-teal-500",
              items: [
                "Basic Concept of CPA Marketing",
                "CPA Offers from IMC Platform",
                "Finding Ad Copies",
                "Keywords Research",
                "Bing Ads Creation & Optimization",
                "DIY Landing Page",
                "Bing Ads Coupons",
              ],
            },
            {
              title: "Personal Branding",
              instructor: "Diya Asrani",
              icon: "🌟",
              color: "from-purple-400 to-pink-500",
              items: [
                "Build Personal Brand Presence",
                "Niche Clarity & Brand Story",
                "Brand Positioning & Kit",
                "Content Creation Strategy",
                "Content Hygiene",
                "Copywriting Basics",
              ],
            },
            {
              title: "Instagram Marketing",
              instructor: "Aman Rajput",
              icon: "📱",
              color: "from-pink-400 to-red-500",
              items: [
                "Instagram Marketing Introduction",
                "Business Accounts & Highlights",
                "Personal Branding with Feed",
                "Stories & Reels Guide",
                "Hashtags & Caption Strategy",
                "Growth Hacks from Scratch",
              ],
            },
            {
              title: "Affiliate Marketing Strategy",
              instructor: "Shivam Gupta",
              icon: "🚀",
              color: "from-cyan-400 to-blue-500",
              items: [
                "Basic Affiliate Marketing Concepts",
                "Why LeadsArk - Advantages",
                "Common Failure Reasons",
                "Presenting LeadsArk to Prospects",
                "Organic Lead Generation",
                "Instagram Hacks for Quality Leads",
                "Content Creation Mastery",
              ],
            },
          ].map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>
                </div>
              </div>

              {/* Course Items */}
              <ul className="space-y-3">
                {course.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-700 group hover:text-gray-900 transition-colors duration-200"
                  >
                    <span className={`text-transparent bg-gradient-to-r ${course.color} bg-clip-text font-bold mr-2 mt-0.5`}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bonus Section */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl p-8 text-white mb-12">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold mb-2">🎁 Exclusive Bonuses Included</h3>
            <div className="w-16 h-1 bg-white bg-opacity-50 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold text-lg mb-1">5 Bonus Courses</h4>
              <p className="text-white text-opacity-90">Worth $999 USD</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-bold text-lg mb-1">Continuous Updates</h4>
              <p className="text-white text-opacity-90">New Course Additions</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">🔴</div>
              <h4 className="font-bold text-lg mb-1">Weekly Live Training</h4>
              <p className="text-white text-opacity-90">Session Recordings Included</p>
            </div>
          </div>
          
          <p className="text-center text-white text-opacity-80 italic mt-4">
            Recordings of all important sessions will be uploaded in the courses
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600">6</div>
            <div className="text-gray-600">Expert Courses</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600">Hours Content</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600">Lifetime</div>
            <div className="text-gray-600">Access</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-orange-600">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">What Professionals Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                AS
              </div>
              <div>
                <p className="text-gray-600 mb-3">
                  "The depth of content in this package is incredible. Each course builds on the other, creating a comprehensive learning journey."
                </p>
                <div className="font-semibold text-gray-800">- Anjali Sharma, Marketing Manager</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                RK
              </div>
              <div>
                <p className="text-gray-600 mb-3">
                  "Finally, a course package that covers everything from technical skills to personal branding. Worth every penny!"
                </p>
                <div className="font-semibold text-gray-800">- Rajesh Kumar, Freelancer</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Upgrade Your Skills?</h3>
            <p className="text-xl text-gray-600 mb-6">Join thousands of professionals who transformed their careers</p>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ← Back to Courses
              </Link>
              
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Enroll Now - Rs. 2000 + GST
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-8 flex-wrap text-gray-600">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> 30-Day Money Back Guarantee
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Certificate of Completion
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Lifetime Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPro;