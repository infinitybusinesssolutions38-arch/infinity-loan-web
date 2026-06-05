import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Shield, Globe, Mail, Phone, Info, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer - Infinity Loans & Business Solutions",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#E6F7FD] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-16">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-[#00AEEF] transition-all mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D6EEF8] mb-8">
              <AlertTriangle className="h-4 w-4 text-[#00AEEF]" />
              <span className="text-sm font-medium text-[#00AEEF]">Disclaimer</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-tight mb-6">
              <span className="text-[#00AEEF]">Disclaimer</span>
            </h1>

            <p className="text-xl text-[#1A1A1A] leading-relaxed mb-8">
              Infinity Loans & Business Solutions
            </p>

            <p className="text-[#666666] leading-relaxed max-w-3xl mx-auto">
              The information provided on the website of Infinity Loans & Business Solutions ("Company", "we", "our", "us") is for general informational purposes only. By accessing and using this website, you acknowledge and agree to the terms of this Disclaimer.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* No Direct Lending */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">1. No Direct Lending</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed">
                Infinity Loans & Business Solutions is a loan distribution and financial advisory firm. We do not provide loans directly, unless explicitly stated. All loan products, approvals, interest rates, tenure, and terms are offered solely by banks, NBFCs, and other regulated lending institutions.
              </p>
            </div>

            {/* No Guarantee of Loan Approval */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">2. No Guarantee of Loan Approval</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Submission of an application or inquiry through our website does not guarantee loan approval or disbursement. Loan approvals are subject to:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Lender eligibility criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Credit assessment and verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Documentation and compliance requirements</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                The final decision rests entirely with the respective lending institution.
              </p>
            </div>

            {/* Accuracy of Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Info className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">3. Accuracy of Information</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                While we make reasonable efforts to ensure that the information on this website is accurate and up to date, Infinity Loans & Business Solutions makes no warranties or representations regarding the completeness, reliability, or accuracy of the content.
              </p>

              <p className="text-[#666666] leading-relaxed">
                Any reliance you place on such information is strictly at your own risk.
              </p>
            </div>

            {/* Financial & Legal Advice */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">4. Financial & Legal Advice</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed">
                The content on this website does not constitute financial, legal, or professional advice. Users are advised to independently evaluate loan products and consult qualified professionals before making any financial decisions.
              </p>
            </div>

            {/* Third-Party Links & Services */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Globe className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">5. Third-Party Links & Services</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Our website may contain links to third-party websites, banks, NBFCs, or service providers. Infinity Loans & Business Solutions does not control, endorse, or assume responsibility for the content, policies, or practices of such third parties.
              </p>

              <p className="text-[#666666] leading-relaxed">
                Accessing third-party websites is at the user's own discretion and risk.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">6. Limitation of Liability</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Infinity Loans & Business Solutions shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Loan rejection, delay, or modification by lenders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Financial losses or business decisions made by users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Website downtime, technical errors, or data transmission issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Actions or omissions of third-party institutions</span>
                </li>
              </ul>
            </div>

            {/* No Warranties */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">7. No Warranties</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed">
                All services and content are provided on an "as is" and "as available" basis without any warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>

            {/* Changes to Disclaimer */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">8. Changes to Disclaimer</h2>
              
              <p className="text-[#666666] leading-relaxed">
                Infinity Loans & Business Solutions reserves the right to modify or update this Disclaimer at any time without prior notice. Changes will be effective immediately upon posting on the website.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">9. Contact Information</h2>

              <p className="text-[#666666] leading-relaxed mb-8">
                For any questions or concerns regarding this Disclaimer, please contact:
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A]">
                  Infinity Loans & Business Solutions
                </h3>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#00AEEF] mt-1 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#1A1A1A] mb-1">Customer Support:</p>
                        <Link href="tel:+919579880841" className="block text-[#666666] hover:text-[#00AEEF]">
                          +91 9579880841
                        </Link>
                        <Link href="tel:+919766616960" className="block text-[#666666] hover:text-[#00AEEF]">
                          +91 9766616960
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-[#00AEEF] mt-1 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#1A1A1A] mb-1">Website:</p>
                        <Link
                          href="https://www.infinityloanservices.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#666666] hover:text-[#00AEEF]"
                        >
                          www.infinityloanservices.com
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#00AEEF] mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">Email:</p>
                      <Link
                        href="mailto:business@infinityloanservices.com"
                        className="block text-[#666666] hover:text-[#00AEEF]"
                      >
                        business@infinityloanservices.com
                      </Link>
                      <Link
                        href="mailto:personal.infinityloans@gmail.com"
                        className="block text-[#666666] hover:text-[#00AEEF]"
                      >
                        personal.infinityloans@gmail.com
                      </Link>
                      <Link
                        href="mailto:business.infinityloans@gmail.com"
                        className="block text-[#666666] hover:text-[#00AEEF]"
                      >
                        business.infinityloans@gmail.com
                      </Link>
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
