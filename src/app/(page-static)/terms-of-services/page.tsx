import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Users, Shield, CreditCard, MessageSquare, Globe, Mail, Phone, Scale, AlertCircle, Building2 } from "lucide-react";
import CompanyOfficeAddress from "@/components/CompanyOfficeAddress";

export const metadata: Metadata = {
  title: "Terms of Services - Infinity Loans & Business Solutions",
};

export default function TermsOfServicesPage() {
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
              <FileText className="h-4 w-4 text-[#00AEEF]" />
              <span className="text-sm font-medium text-[#00AEEF]">Terms of Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-tight mb-6">
              Terms of <span className="text-[#00AEEF]">Services</span>
            </h1>

            <p className="text-xl text-[#1A1A1A] leading-relaxed mb-8">
              Infinity Loans & Business Solutions
            </p>

            <p className="text-[#666666] leading-relaxed max-w-3xl mx-auto">
              These Terms of Services ("Terms") govern your access to and use of the website and services provided by Infinity Loans & Business Solutions ("Company", "we", "our", "us"). By accessing our website or using any of our loan and financial advisory services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Nature of Services */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">1. Nature of Services</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Infinity Loans & Business Solutions is a loan distribution and financial advisory firm that assists individuals and businesses in obtaining loans and related financial products from banks, NBFCs, and other regulated financial institutions.
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>We act as a facilitator and advisor and do not provide loans directly, unless explicitly stated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Final approval, disbursement, interest rates, tenure, and terms of loans are solely at the discretion of the respective lending institutions.</span>
                </li>
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">2. Eligibility</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                By using our services, you represent and warrant that:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>You are at least 18 years of age</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>You are legally capable of entering into a binding agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>The information provided by you is true, accurate, and complete</span>
                </li>
              </ul>
            </div>

            {/* User Obligations */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">3. User Obligations</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                You agree to:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Provide accurate and complete personal, financial, and identification details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Update information promptly if there are any changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Use our website and services only for lawful purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Not submit false, misleading, or fraudulent information</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                Infinity Loans & Business Solutions reserves the right to reject or discontinue services if any information is found to be incorrect or misleading.
              </p>
            </div>

            {/* Loan Processing & Approval */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">4. Loan Processing & Approval</h2>
              </div>
              
              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Submission of an application does not guarantee loan approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Loan approval is subject to lender eligibility criteria, credit assessment, and verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Interest rates, charges, and terms are determined solely by the lender</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Processing timelines may vary based on lender and documentation</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                We are not responsible for rejection, delay, or modification of loan terms by any lending institution.
              </p>
            </div>

            {/* Fees & Charges */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">5. Fees & Charges</h2>
              
              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Any service fees, processing fees, or advisory charges (if applicable) will be communicated transparently to the user prior to engagement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Infinity Loans & Business Solutions does not charge any hidden fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>All fees paid are non-refundable, unless explicitly stated in writing.</span>
                </li>
              </ul>
            </div>

            {/* Credit Information & Verification */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">6. Credit Information & Verification</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                By using our services, you authorize us to:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Obtain credit information from credit bureaus such as CIBIL, Experian, Equifax, and CRIF High Mark</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Share necessary information with banks, NBFCs, and verification agencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Conduct background, employment, and financial verifications</span>
                </li>
              </ul>
            </div>

            {/* Communication Consent */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">7. Communication Consent</h2>
              </div>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                You expressly consent to receive communications from us via:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Phone calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Email</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                These communications may relate to loan applications, service updates, offers, or regulatory requirements.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">8. Intellectual Property</h2>
              
              <p className="text-[#666666] leading-relaxed">
                All content on the website, including text, graphics, logos, design, and layout, is the intellectual property of Infinity Loans & Business Solutions and may not be copied, reproduced, or used without prior written consent.
              </p>
            </div>

            {/* Third-Party Services & Links */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Globe className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">9. Third-Party Services & Links</h2>
              </div>
              
              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Our website may include links to third-party websites or services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>We do not control or endorse such third parties and are not responsible for their content, policies, or practices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Users access third-party services at their own risk.</span>
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">10. Limitation of Liability</h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                Infinity Loans & Business Solutions shall not be liable for:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Any loan rejection, delay, or change in terms by lenders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Financial losses arising from lender decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Technical issues, website downtime, or data transmission errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Actions or omissions of third-party institutions</span>
                </li>
              </ul>

              <p className="text-[#666666] leading-relaxed mt-6">
                Our role is limited to facilitation and advisory services only.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">11. Indemnification</h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                You agree to indemnify and hold harmless Infinity Loans & Business Solutions from any claims, losses, damages, or liabilities arising from:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Breach of these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Submission of incorrect or fraudulent information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Misuse of our website or services</span>
                </li>
              </ul>
            </div>

            {/* Suspension or Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">12. Suspension or Termination</h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                We reserve the right to suspend or terminate access to our services without prior notice if:
              </p>

              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>These Terms are violated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Fraudulent or unlawful activity is suspected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Required documentation is not provided</span>
                </li>
              </ul>
            </div>

            {/* Governing Law & Jurisdiction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                  <Scale className="h-6 w-6 text-[#00AEEF]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">13. Governing Law & Jurisdiction</h2>
              </div>
              
              <ul className="space-y-3 text-[#666666]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>These Terms shall be governed by and construed in accordance with the laws of India.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00AEEF] mt-1">•</span>
                  <span>Any disputes shall be subject to the exclusive jurisdiction of courts located in Gurugram, Haryana.</span>
                </li>
              </ul>
            </div>

            {/* Amendments */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">14. Amendments</h2>
              
              <p className="text-[#666666] leading-relaxed">
                Infinity Loans & Business Solutions reserves the right to modify these Terms at any time. Updated Terms will be effective immediately upon publication on the website.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">15. Contact Information</h2>

              <p className="text-[#666666] leading-relaxed mb-8">
                For any queries or concerns regarding these Terms of Services, please contact:
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
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <Building2 className="h-5 w-5 text-[#00AEEF] mt-1 shrink-0" />
                    <CompanyOfficeAddress heading="Office Location:" />
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