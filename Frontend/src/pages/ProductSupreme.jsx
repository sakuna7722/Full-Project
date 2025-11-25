import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductSupreme() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get("/courses");
        const selectedCourse =
          res.data.find((c) => c.slug === "supreme") || res.data[0];
        setCourse(selectedCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-100 py-16 border-b">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              {course ? course.name : "Loading..."}
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
              This program is designed to teach you high-value digital skills such as 
              AI usage, content creation, branding, social media growth, and 
              digital marketing strategy. You will also learn automation tools, 
              professional communication, and modern online business systems 
              used by top creators and marketers worldwide.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                ← Back to Courses
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={course?.thumbnail || "/images/anmol-duggal.png"}
                alt={course?.name || "Trainer"}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 text-center">
          {[
            { icon: "/coursesImg/course_icon.png", label: "20+ Skill Modules" },
            { icon: "/coursesImg/hours_icon.png", label: "150+ Hours" },
            { icon: "/coursesImg/students_icon.png", label: "15K+ Students" }, 
            { icon: "/coursesImg/certificate_icon.png", label: "Certificate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[140px] text-gray-700"
            >
              <img src={stat.icon} alt={stat.label} className="w-12 h-12 mb-2" />
              <p className="font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What You Will Learn
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {[
              {
                title: "AI & ChatGPT Mastery",
                points: [
                  "Understanding AI, LLMs & ChatGPT",
                  "Prompt Writing & Frameworks",
                  "AI for Marketing & Research",
                  "Creating AI-Based Content",
                  "Building AI Workflows for Productivity",
                ],
              },
              {
                title: "Digital Marketing Essentials",
                points: [
                  "SEO Basics & Keyword Research",
                  "Social Media Growth Strategies",
                  "Funnels & Customer Journey",
                  "Brand Positioning & Messaging",
                  "Analytics & Tracking",
                ],
              },
              {
                title: "Content Creation Mastery",
                points: [
                  "Reels & Short Video Creation",
                  "YouTube Basics & Optimization",
                  "Canva Designing for Creators",
                  "Thumbnail & Banner Design",
                  "Content Planning System",
                ],
              },
              {
                title: "Instagram Growth System",
                points: [
                  "Business Account Setup",
                  "Content Framework for Growth",
                  "Reels Strategy & Hooks",
                  "Engagement Boost Techniques",
                  "Personal Branding on Instagram",
                ],
              },
              {
                title: "Automation & Tools",
                points: [
                  "Email Tools (Mailchimp / Sender)",
                  "Google Sheets + AI Automation",
                  "Notion for Planning & Productivity",
                  "Using Zapier/Make for Automation",
                  "Simple CRM Systems",
                ],
              },
              {
                title: "Professional Development",
                points: [
                  "Client Communication Skills",
                  "Building Your Online Portfolio",
                  "Personal Brand Building",
                  "Presentation Skills",
                  "Content-Based Networking",
                ],
              },
              {
                title: "Creator Growth Skills",
                points: [
                  "Topic Selection & Niche Clarity",
                  "Storytelling for Social Media",
                  "Audience-Building Framework",
                  "Community Building Secrets",
                  "Long-Term Growth Strategy",
                ],
              },
              {
                title: "Continuous Updates",
                points: [
                  "New Module Releases",
                  "Updated Strategies Regularly",
                  "Live Session Recordings Included",
                ],
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.points.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-700 leading-relaxed"
                    >
                      <span className="text-blue-600 mr-3 mt-1">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Who Is This Course For?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Students wanting to build digital skills",
              "Working professionals looking to upgrade",
              "Creators & entrepreneurs growing online",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-md transition"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-16 bg-white border-t">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-10">
            {[
              "✅ Lifetime Access",
              "✅ Certificate of Completion",
              "✅ Money Back Guarantee",
            ].map((badge, idx) => (
              <div
                key={idx}
                className="text-lg font-semibold text-gray-700 flex items-center"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductSupreme;
