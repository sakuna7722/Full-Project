import React, { useState, useEffect } from 'react';

const chatData = [
  { name: "Rohan Mehra", message: "Hey, I have a quick project need a visiting card design by this weekend" },
  { name: "Priya Singh", message: "Can you send me the latest mockups?" },
  { name: "Ankit Verma", message: "I need the website draft by tomorrow" },
  { name: "Simran Kaur", message: "Let's finalize the logo today" },
  { name: "Amit Sharma", message: "Can you check the payment details?" },
];

function Home() {
  const [chatIndex, setChatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatIndex((prev) => (prev + 1) % chatData.length);
    }, 1200); // rotates every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentChat = chatData[chatIndex];
  return (
    <section className="bg-white py-8 px-4 sm:py-16 sm:px-8 md:px-16 relative overflow-visible">
      {/* Optional background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 z-0 bg-repeat bg-[length:100px_100px]"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto z-10">
        {/* Left Side: Text and CTA */}
        <div className="z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Think Freelance
            <br />
            <span className="relative inline-block mt-2">
              Think{' '}
              <span className="relative inline-block font-extrabold text-gray-900">
                <span className="relative z-10">NextGenCoders</span>
                <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500 transform -skew-x-12 z-0"></span>
              </span>
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-md">
            Join India’s Top Digital Freelance School with 3,50,000+ freelancers who’ve transformed their skills into income.
          </p>

          <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold text-base sm:text-lg flex items-center gap-2 transition-all duration-300">
            Start Learning Today <span className="text-xl">↗</span>
          </button>
        </div>

        {/* Right Side: Image and Feedback */}
        <div className="relative w-full min-h-[300px] sm:min-h-[400px] z-10 flex justify-center items-center">

          {/* Wrapper to control image and floating cards */}
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[500px] group">
            <img
              src="/Girl-1.jpg"
              alt="Freelancer"
              className="w-full h-auto object-contain rounded-xl shadow-xl scale-100 md:scale-110"
              style={{ transformOrigin: 'bottom center' }}
            />
            {/* Rotating Chat Bubble */}
            <div className="absolute -top-4 left-4 sm:left-[-100px] bg-white p-4 rounded-lg shadow-lg w-64 flex gap-3 items-start z-20 transition-all duration-500">

              <div className="text-orange-500 text-2xl">💬</div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{currentChat.name}</p>
                <p className="text-xs text-gray-600">{currentChat.message}</p>
              </div>
            </div>

            {/* Feedback Box */}
            {/* <div className="absolute -bottom-8 right-0 sm:right-0 md:right-0 lg:right-0 bg-white p-5 rounded-lg shadow-lg w-72 text-sm z-20
              opacity-100 visible sm:opacity-0 sm:invisible sm:group-hover:opacity-100 sm:group-hover:visible transition-all duration-300
              left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0">

              <h3 className="font-bold text-gray-800 mb-3">Client Feedback</h3>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Work</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Project</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Behaviour</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Punctuality</span>
                <span className="bg-gray-100 px-2 py-1 rounded">+5</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-800">4.5</span>
                <div className="text-orange-400 text-lg">★★★★☆</div>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">Rate and Review</h4>
              <div className="flex gap-1 mb-3 text-xl text-gray-300 cursor-pointer">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="hover:text-orange-400 transition-colors duration-200">☆</span>
                ))}
              </div>

              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span>🧑</span> Hey! I'm looking for a freelancer to design a website banner.
                </li>
                <li className="flex items-start gap-2">
                  <span>👩</span> Thanks for the quick turnaround. Quality exceeded expectations.
                </li>
                <li className="flex items-start gap-2">
                  <span>👨</span> Very professional and creative work. Loved the attention to detail.
                </li>
              </ul>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;