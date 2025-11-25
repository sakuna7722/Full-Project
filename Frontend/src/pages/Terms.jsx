import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Terms() {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-md">
          Terms & Conditions
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-orange-100 px-4 leading-relaxed">
          Please read these Terms carefully before using leadsgurukul. By signing up, you agree to the terms below.
        </p>
      </section>

      {/* Terms Content */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 sm:p-14 -mt-10 mb-16 relative z-10">
        <ul className="list-disc list-inside space-y-4 text-gray-700 text-left text-lg leading-relaxed">
          
          <li>You must provide accurate information while creating your account. Fake or misleading details may result in account termination.</li>

          <li>You are responsible for keeping your account login details confidential. Any activity done using your account will be considered your responsibility.</li>

          <li>All purchases made on our platform are final. No refund will be provided after successful enrollment in a course.</li>

          <li>You agree not to misuse the platform or engage in activities such as spamming, hacking, fake referrals, or system manipulation.</li>

          <li>We reserve the right to update, modify, or discontinue any course, feature, or service at any time without prior notice.</li>

          <li>Any commission or referral reward earned through fraudulent activity will be cancelled, and the account may be suspended.</li>

          <li>By accessing our platform, you agree not to copy, share, or distribute paid course content. Doing so is strictly prohibited and may lead to legal action.</li>

          <li>Your use of our website must comply with all applicable laws and regulations.</li>

          <li>We may update these Terms & Conditions from time to time. Continued use of the platform means you agree to the updated terms.</li>
          
        </ul>

        {/* Back Link */}
        <div className="text-center mt-10">
          <Link
            to="/auth/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Back to Sign Up
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
