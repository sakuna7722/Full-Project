import React, { useState } from "react";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Student-level questions
  const faqs = [
    { question: "What is included in this course?" },
    { question: "Is this course beginner friendly?" },
    { question: "Will I get a certificate after completing the course?" },
    { question: "How long will I have access to the course?" },
    { question: "Can I access the course on mobile?" },
    { question: "What is the refund policy?" },
    { question: "Do I need any prior knowledge before joining?" },
    { question: "How can I contact support if I face issues?" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-10">
          Frequently Asked Questions
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b last:border-b-0 py-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-purple-700">
                  {faq.question}
                </h2>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <div className="mt-3 text-gray-700 leading-relaxed">
                  {index === 0 && (
                    <p>
                      The course includes pre-recorded video lessons, study
                      materials, downloadable resources, and lifetime access to
                      all future updates.
                    </p>
                  )}

                  {index === 1 && (
                    <p>
                      Yes! This course is designed for complete beginners as
                      well as anyone who wants to improve their skills step by
                      step.
                    </p>
                  )}

                  {index === 2 && (
                    <p>
                      Yes, after completing all modules, you will receive a
                      digital certificate that you can download and use.
                    </p>
                  )}

                  {index === 3 && (
                    <p>
                      You will get lifetime access. You can watch the course
                      anytime, from anywhere, without any expiry.
                    </p>
                  )}

                  {index === 4 && (
                    <p>
                      Yes, the course works perfectly on mobile, tablet, and
                      laptop. You just need a stable internet connection.
                    </p>
                  )}

                  {index === 5 && (
                    <p>
                      We offer a refund only if the course has not been
                      accessed. Once you start watching lessons, refunds cannot
                      be processed.
                    </p>
                  )}

                  {index === 6 && (
                    <p>
                      No prior knowledge is required. Everything is taught from
                      the basics in a step-by-step format.
                    </p>
                  )}

                  {index === 7 && (
                    <p>
                      You can contact our support team anytime at{" "}
                      <a
                        href="mailto:support@leadsgurukul.com"
                        className="text-purple-700 underline"
                      >
                        support@leadsgurukul.com
                      </a>
                      . We typically respond within 24 hours.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FAQ;
