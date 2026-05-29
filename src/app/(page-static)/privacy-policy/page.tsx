import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, FileText, Users, Building2, Mail, Phone, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Infinity Loans & Business Solutions",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97415]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gray-800/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Shield className="h-4 w-4 text-[#F97415]" />
              <span className="text-sm font-medium text-white">Privacy Policy</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
              Privacy <span className="text-[#F97415]">Policy</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Infinity Loans & Business Solutions
            </p>

            <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Infinity Loans & Business Solutions ("we", "our", "us") is committed to protecting the privacy, confidentiality, and security of personal information shared by users ("you", "your") while accessing our website and availing our loan and financial advisory services. This Privacy Policy explains how we collect, use, disclose, store, and safeguard your information in compliance with applicable laws and regulations in India.
            </p>

            <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto mt-4">
              By using our website or services, you agree to the terms of this Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">1. Information We Collect</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                We may collect and process the following information:
              </p>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-black mb-4">1.1 Personal Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Full name, mobile number, and email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Date of birth and residential address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Identity documents such as PAN, Aadhaar, or other government-issued IDs (where applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Employment, business, and income details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Banking and financial information required for loan processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Credit information, including credit score and repayment history, subject to your consent</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-black mb-4">1.2 Non-Personal Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>IP address, browser type, and device details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Website usage data, including pages visited and duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F97415] mt-1">•</span>
                    <span>Cookies and similar tracking technologies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Purpose of Data Collection */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">2. Purpose of Data Collection</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Your information is collected and used for:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Evaluating and processing loan and financial service applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Connecting you with banks, NBFCs, and lending partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Identity verification, credit assessment, and fraud prevention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Communication related to services, applications, and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Improving our website functionality and customer experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Compliance with legal, regulatory, and statutory obligations</span>
                </li>
              </ul>
            </div>

            {/* Disclosure of Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">3. Disclosure of Information</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                We do not sell, rent, or trade your personal information. Information may be shared only with:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Banks, NBFCs, and authorized lending institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Credit bureaus such as CIBIL, Experian, Equifax, and CRIF High Mark</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Third-party service providers assisting with verification or processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Regulatory, legal, or governmental authorities as required by law</span>
                </li>
              </ul>

              <p className="text-gray-600 leading-relaxed mt-6">
                All disclosures are made strictly on a need-to-know basis and under confidentiality obligations.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">4. Data Security</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable administrative, technical, and physical safeguards to protect personal information from unauthorized access, misuse, alteration, or disclosure. While we strive to maintain strong security standards, no system can guarantee absolute security.
              </p>
            </div>

            {/* Cookies Policy */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">5. Cookies Policy</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies and similar technologies to enhance user experience, analyze traffic, and improve services. Users may disable cookies through browser settings; however, some website features may be affected.
              </p>
            </div>

            {/* User Consent */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">6. User Consent</h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                By submitting your information on our website, you expressly consent to:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Collection, storage, and processing of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Contact via phone calls, SMS, WhatsApp, or email for service-related communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Credit checks and verification required for loan eligibility assessment</span>
                </li>
              </ul>
            </div>

            {/* Third-Party Websites */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">7. Third-Party Websites</h2>
              
              <p className="text-gray-600 leading-relaxed">
                Our website may contain links to external websites. Infinity Loans & Business Solutions is not responsible for the privacy practices or content of such third-party sites. Users are advised to review their privacy policies independently.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">8. Data Retention</h2>
              
              <p className="text-gray-600 leading-relaxed">
                Personal information is retained only for as long as necessary to fulfill business, legal, and regulatory requirements or as permitted under applicable law.
              </p>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">9. User Rights</h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Subject to applicable laws, you have the right to:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Access and review your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Request correction of inaccurate or incomplete data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Withdraw consent, where legally permissible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Request deletion of personal data, subject to statutory obligations</span>
                </li>
              </ul>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">10. Changes to This Policy</h2>
              
              <p className="text-gray-600 leading-relaxed">
                Infinity Loans & Business Solutions reserves the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting on the website.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">11. Contact Information</h2>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                For any questions, concerns, or requests regarding this Privacy Policy, please contact us:
              </p>

              <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold text-white mb-6">Infinity Loans & Business Solutions</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Customer Support:</p>
                      <p className="text-gray-300">+91 9579880841</p>
                      <p className="text-gray-300">+91 9766616960</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Email:</p>
                      <p className="text-gray-300">business@infinityloanservices.com</p>
                      <p className="text-gray-300">personal.infinityloans@gmail.com</p>
                      <p className="text-gray-300">business.infinityloans@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Website:</p>
                      <p className="text-gray-300">www.infinityloanservices.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Office Locations</p>
                      <p className="text-gray-300 text-sm">Corporate & Registered Office: 8th Floor, Magnum Tower – 1, Golf Course Extension Road, Sector 58, Gurugram, Haryana – 122098, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
