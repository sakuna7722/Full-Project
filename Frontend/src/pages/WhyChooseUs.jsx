// src/pages/WhyChooseUs.jsx
import React from "react";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-yellow-500" />,
      title: "Expert Mentorship",
      desc: "Learn from top mentors with years of experience guiding aspirants.",
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-500" />,
      title: "Community Support",
      desc: "Be part of a strong aspirant community to share knowledge & strategies.",
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "Proven Strategy",
      desc: "Step-by-step roadmap to crack exams with discipline & clarity.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-yellow-500" />,
      title: "Result-Oriented",
      desc: "Focused approach with mock tests, evaluations & feedback.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-yellow-50 flex flex-col items-center py-20 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Why Choose Our Program?
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          A structured, result-driven approach to help you prepare for IAS exams
          with confidence, clarity, and consistency.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl w-full mb-20">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition transform hover:-translate-y-2"
          >
            <div className="mb-5">{f.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl text-center mb-20 border border-yellow-100"
      >
        <p className="text-xl text-gray-700 italic mb-6">
          “This program changed my approach completely. With guidance, mock
          tests, and proper planning, I cleared prelims with high confidence.
          Highly recommended to all aspirants!”
        </p>
        <h4 className="font-bold text-gray-900">— Riya Sharma</h4>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Enroll now and take the first step towards your dream.
        </p>
        <Link
          to="/courses"
          className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Enroll Now 🚀
        </Link>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
