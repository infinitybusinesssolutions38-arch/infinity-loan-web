import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, FileText, Users, Building2, Mail, Phone, Globe } from "lucide-react";
import CompanyOfficeAddress from "@/components/CompanyOfficeAddress";

export const metadata: Metadata = {
  title: "Privacy Policy - Infinity Loans & Business Solutions",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F7F9FC] py-8 md:py-12 lg:py-16">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E6F7FD]/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#E6F7FD]/20 blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FD] border border-[#D6EEF8] mb-8">
              <Shield className="h-4 w-4 text-[#00AEEF]" />
              <span className="text-sm font-medium text-[#00AEEF]">Privacy Policy</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-tight mb-6">
              Privacy <span className="text-[#00AEEF]">Policy</span>
            </h1>

            <p className="text-xl text-[#666666] leading-relaxed mb-8">
              Infinity Loans & Business Solutions
            </p>

            <p className="text-[#666666] leading-relaxed max-w-3xl mx-auto">
              Infinity Loans & Business Solutions ("we", "our", "us") is committed to protecting the privacy, confidentiality, and security of personal information shared by users ("you", "your") while accessing our website and availing our loan and financial advisory services. This Privacy Policy explains how we collect, use, disclose, store, and safeguard your information in compliance with applicable laws and regulations in India.
            </p>

            <p className="text-[#666666] leading-relaxed max-w-3xl mx-auto mt-4">
              By using our website or services, you agree to the terms of this Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Eye className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">1. Information We Collect</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                We may collect and process the following information:
              </p>

              <div className="bg-white rounded-2xl border border-[#D6EEF8] p-6 mb-6 shadow-sm transition-all duration-300 ease-out hover:border-[#00AEEF]">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">1.1 Personal Information</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Full name, mobile number, and email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Date of birth and residential address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Identity documents such as PAN, Aadhaar, or other government-issued IDs (where applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Employment, business, and income details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Banking and financial information required for loan processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Credit information, including credit score and repayment history, subject to your consent</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-[#D6EEF8] p-6 shadow-sm transition-all duration-300 ease-out hover:border-[#00AEEF]">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">1.2 Non-Personal Information</h3>
                <ul className="space-y-2 text-[#666666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>IP address, browser type, and device details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Website usage data, including pages visited and duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00AEEF] mt-1">•</span>
                    <span>Cookies and similar tracking technologies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Purpose of Data Collection */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">2. Purpose of Data Collection</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Your information is collected and used for:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Evaluating and processing loan and financial service applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Connecting you with banks, NBFCs, and lending partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Identity verification, credit assessment, and fraud prevention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Communication related to services, applications, and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Improving our website functionality and customer experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Compliance with legal, regulatory, and statutory obligations</span>
                </li>
              </ul>
            </div>

            {/* Disclosure of Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">3. Disclosure of Information</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                We do not sell, rent, or trade your personal information. Information may be shared only with:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Banks, NBFCs, and authorized lending institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Credit bureaus such as CIBIL, Experian, Equifax, and CRIF High Mark</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Third-party service providers assisting with verification or processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Regulatory, legal, or governmental authorities as required by law</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                All disclosures are made strictly on a need-to-know basis and under confidentiality obligations.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Lock className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">4. Data Security</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed">
                We implement reasonable administrative, technical, and physical safeguards to protect personal information from unauthorized access, misuse, alteration, or disclosure. While we strive to maintain strong security standards, no system can guarantee absolute security.
              </p>
            </div>

            {/* Cookies Policy */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Globe className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">5. Cookies Policy</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed">
                Our website uses cookies and similar technologies to enhance user experience, analyze traffic, and improve services. Users may disable cookies through browser settings; however, some website features may be affected.
              </p>
            </div>

            {/* User Consent */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">6. User Consent</h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                By submitting your information on our website, you expressly consent to:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Collection, storage, and processing of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Contact via phone calls, SMS, WhatsApp, or email for service-related communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Credit checks and verification required for loan eligibility assessment</span>
                </li>
              </ul>
            </div>

            {/* Third-Party Websites */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">7. Third-Party Websites</h2>
              
              <p className="text-[#666666] leading-relaxed">
                Our website may contain links to external websites. Infinity Loans & Business Solutions is not responsible for the privacy practices or content of such third-party sites. Users are advised to review their privacy policies independently.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">8. Data Retention</h2>
              
              <p className="text-[#666666] leading-relaxed">
                Personal information is retained only for as long as necessary to fulfill business, legal, and regulatory requirements or as permitted under applicable law.
              </p>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">9. User Rights</h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Subject to applicable laws, you have the right to:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Access and review your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Request correction of inaccurate or incomplete data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Withdraw consent, where legally permissible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Request deletion of personal data, subject to statutory obligations</span>
                </li>
              </ul>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">10. Changes to This Policy</h2>
              
              <p className="text-[#666666] leading-relaxed">
                Infinity Loans & Business Solutions reserves the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting on the website.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">11. Contact Information</h2>

              <p className="text-[#666666] leading-relaxed mb-8">
                For any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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

                  <div className="space-y-6">
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
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-[#00AEEF] mt-1 shrink-0" />
                      <div>
                        <CompanyOfficeAddress heading="Office Location:" />
                      </div>
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