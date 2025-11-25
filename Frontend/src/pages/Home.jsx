import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const chatData = [
  { name: "Rohan Mehra", message: "Hey, I need a visiting card design by this weekend!" },
  { name: "Priya Singh", message: "Can you send me the latest mockups?" },
  { name: "Ankit Verma", message: "I need the website draft by tomorrow." },
  { name: "Simran Kaur", message: "Let's finalize the logo today." },
  { name: "Amit Sharma", message: "Can you check the payment details?" },
];

function Home() {
  const [chatIndex, setChatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatIndex((prev) => (prev + 1) % chatData.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const currentChat = chatData[chatIndex];

  return (
    <section className="bg-white py-10 px-6 sm:py-16 relative overflow-hidden">

      {/* Light Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat bg-[length:120px_120px]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">

        {/* -------- LEFT SIDE -------- */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Build Your Skills <br />
            <span className="relative">
              Grow With{" "}
              <span className="relative font-extrabold text-gray-900">
                leadsgurukul
                <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500 -skew-x-12"></span>
              </span>
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-md">
            Join India’s learners who’ve transformed their skills into income through expert-guided training.
          </p>

          <Link to="/auth/signup">
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 shadow transition">
              Start Learning Today <span className="text-xl">↗</span>
            </button>
          </Link>
        </div>

        {/* -------- RIGHT SIDE -------- */}
        <div className="flex justify-center relative">

          {/* Main Image */}
          <div className="relative w-full max-w-[420px]">
            <img
              src="/Girl-1.jpg"
              alt="Freelancer"
              className="rounded-xl shadow-xl w-full object-contain"
            />

            {/* Floating Chat Bubble */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg w-64 flex gap-3 items-start z-20 transition-all duration-500">
              <div className="text-orange-500 text-2xl">💬</div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{currentChat.name}</p>
                <p className="text-xs text-gray-600">{currentChat.message}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
