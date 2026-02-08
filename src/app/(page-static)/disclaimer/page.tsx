import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Shield, CreditCard, Globe, Building2, Mail, Phone, Info, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer - Infinity Loans & Business Solutions",
};

export default function DisclaimerPage() {
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
              <AlertTriangle className="h-4 w-4 text-[#F97415]" />
              <span className="text-sm font-medium text-white">Disclaimer</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
              <span className="text-[#F97415]">Disclaimer</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Infinity Loans & Business Solutions
            </p>

            <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
              The information provided on the website of Infinity Loans & Business Solutions ("Company", "we", "our", "us") is for general informational purposes only. By accessing and using this website, you acknowledge and agree to the terms of this Disclaimer.
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
            {/* No Direct Lending */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">1. No Direct Lending</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Infinity Loans & Business Solutions is a loan distribution and financial advisory firm. We do not provide loans directly, unless explicitly stated. All loan products, approvals, interest rates, tenure, and terms are offered solely by banks, NBFCs, and other regulated lending institutions.
              </p>
            </div>

            {/* No Guarantee of Loan Approval */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">2. No Guarantee of Loan Approval</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Submission of an application or inquiry through our website does not guarantee loan approval or disbursement. Loan approvals are subject to:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Lender eligibility criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Credit assessment and verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Documentation and compliance requirements</span>
                </li>
              </ul>

              <p className="text-gray-600 leading-relaxed mt-6">
                The final decision rests entirely with the respective lending institution.
              </p>
            </div>

            {/* Accuracy of Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Info className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">3. Accuracy of Information</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                While we make reasonable efforts to ensure that the information on this website is accurate and up to date, Infinity Loans & Business Solutions makes no warranties or representations regarding the completeness, reliability, or accuracy of the content.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Any reliance you place on such information is strictly at your own risk.
              </p>
            </div>

            {/* Financial & Legal Advice */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">4. Financial & Legal Advice</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                The content on this website does not constitute financial, legal, or professional advice. Users are advised to independently evaluate loan products and consult qualified professionals before making any financial decisions.
              </p>
            </div>

            {/* Third-Party Links & Services */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">5. Third-Party Links & Services</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Our website may contain links to third-party websites, banks, NBFCs, or service providers. Infinity Loans & Business Solutions does not control, endorse, or assume responsibility for the content, policies, or practices of such third parties.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Accessing third-party websites is at the user's own discretion and risk.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">6. Limitation of Liability</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Infinity Loans & Business Solutions shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of:
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Loan rejection, delay, or modification by lenders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Financial losses or business decisions made by users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Website downtime, technical errors, or data transmission issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F97415] mt-1">•</span>
                  <span>Actions or omissions of third-party institutions</span>
                </li>
              </ul>
            </div>

            {/* No Warranties */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-[#F97415]" />
                </div>
                <h2 className="text-3xl font-bold text-black">7. No Warranties</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                All services and content are provided on an "as is" and "as available" basis without any warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>

            {/* Changes to Disclaimer */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">8. Changes to Disclaimer</h2>
              
              <p className="text-gray-600 leading-relaxed">
                Infinity Loans & Business Solutions reserves the right to modify or update this Disclaimer at any time without prior notice. Changes will be effective immediately upon posting on the website.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-6">9. Contact Information</h2>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                For any questions or concerns regarding this Disclaimer, please contact:
              </p>

              <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold text-white mb-6">Infinity Loans & Business Solutions</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Customer Support:</p>
                      <p className="text-gray-300">+91 95798 80841 | +91 97661 69660</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Email:</p>
                      <p className="text-gray-300">business@infinityloanservices.com</p>
                      <p className="text-gray-300">businessservicesinfinity@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#F97415] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-1">Website:</p>
                      <p className="text-gray-300">www.infinityloanservices.com</p>
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
