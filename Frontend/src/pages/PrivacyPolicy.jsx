import React from "react";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 leading-relaxed space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              1. Introduction
            </h2>
            <p>
              At <strong>Leadsgurukul</strong>, we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your personal 
              information when you purchase and use our online course.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details such as your name, email address, and phone number.</li>
              <li>Payment information (handled securely by our payment gateway).</li>
              <li>Course access details and your account activity.</li>
              <li>Technical information such as IP address, device info, and browser type.</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account.</li>
              <li>To provide you access to the course you purchased.</li>
              <li>To improve our training content and website performance.</li>
              <li>To send important updates related to your course.</li>
              <li>To comply with legal and safety requirements.</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              4. Cookies & Tracking
            </h2>
            <p>
              We use cookies to enhance your experience, improve website performance, 
              and track usage analytics. You may disable cookies through your browser settings, 
              but certain website features may not work properly.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              5. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell your personal information. We may share necessary data 
              with trusted third-party providers such as payment gateways, hosting providers, 
              and analytics tools solely to operate our platform safely and efficiently.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              6. Security of Your Data
            </h2>
            <p>
              We use industry-standard security measures to protect your personal data. 
              However, no online service can guarantee 100% security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              7. Your Rights & Choices
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access or correction to your personal information.</li>
              <li>Opt out of non-essential communications.</li>
              <li>Request deletion of your account or data (subject to verification).</li>
            </ul>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updated versions 
              will be posted on this page with the latest revision date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-purple-600">
              9. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, feel free to contact us at:{" "}
              <a
                href="mailto:support@leadsgurukul.com"
                className="text-purple-600 underline"
              >
                support@leadsgurukul.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
