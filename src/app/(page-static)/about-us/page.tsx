import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, TrendingUp, Users, Award, Shield, Clock, CheckCircle2, Building2, Briefcase, Home, Wrench, User, Zap, BriefcaseBusiness, BadgeAlert, HandCoins, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PrivateInstitutionalHighlight from "@/app/components/PrivateInstitutionalHighlight";
import PoorCibilHighlight from "@/app/components/PoorCibilHighlight";
import EmiRestructuringHighlight from "@/app/components/Emirestructuringhighlight";
import PropertyLoanHighlight from "@/app/components/Propertyloanhighlight";

export const metadata: Metadata = {
  title: "About Us - Infinity Loans & Business Solutions",
};

export default function AboutUsPage() {
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

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#F97415] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Infinity Loans & Business Solutions</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                About{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#F97415]">Us</span>
                  <span className="absolute bottom-3 left-0 w-full h-4 bg-[#F97415]/20 -rotate-2" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Infinity Loans & Business Solutions
              </p>

              <p className="text-base text-gray-400 leading-relaxed">
                Infinity Loans & Business Solutions is a financial advisory and loan facilitation firm committed to delivering the right analysis, the right structure, and the right lender fit for every client.
              </p>

              <p className="text-base text-gray-400 leading-relaxed">
                We work closely with individuals and businesses to understand their financial requirements, assess risk profiles, structure loan applications, and map each case to the most suitable banks and NBFCs. Our team remains actively involved throughout the entire process—from initial profiling and documentation to approval and final disbursement—ensuring a smooth, transparent, and efficient experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <button className="group relative px-8 py-4 bg-[#F97415] hover:bg-[#E06410] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                    <span>Talk to an Expert</span>
                    <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20">
                    Explore Services
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Stats Grid */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Our Track Record at a Glance", value: "60,000+", subtitle: "Satisfied Clients Served", icon: Users },
                  { label: "Our Track Record at a Glance", value: "₹600+ Crore", subtitle: "Total Loans Successfully Disbursed", icon: Building2 },
                  { label: "Our Track Record at a Glance", value: "Within 48 Hours", subtitle: "Average Credit Approval Turnaround", icon: Clock },
                  { label: "Our Track Record at a Glance", value: "96%", subtitle: "Overall Success & Conversion Rate", icon: CheckCircle2 },
                ].map((stat, idx) => (
                  <div
                    key={stat.label}
                    className="group rounded-2xl bg-white/10 backdrop-blur-xl p-5 border border-white/10 hover:border-[#F97415]/50 transition-all duration-300 hover:scale-105"
                    style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.label}</p>
                      <stat.icon className="h-5 w-5 text-[#F97415] group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-400 leading-tight">{stat.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PrivateInstitutionalHighlight />
      <PoorCibilHighlight />
      <EmiRestructuringHighlight />
      <PropertyLoanHighlight />

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

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm mb-4">
              <TrendingUp className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">Our Purpose</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-[#F97415]">Mission</span> & <span className="text-[#F97415]">Vision</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            <article className="group relative rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#F97415]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Our mission is to provide trusted, transparent, and expert-driven financial advisory services that empower individuals and businesses to access the most suitable funding solutions with clarity and confidence.
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 border border-gray-700">
                <p className="text-sm font-semibold text-white mb-4">We are committed to:</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">In-depth credit assessment and financial analysis</div>
                      <div>Ensuring every recommendation is backed by thorough evaluation and insight.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Ethical, unbiased, and client-first advisory</div>
                      <div>Placing our clients’ long-term interests at the center of every decision.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Accurate loan structuring aligned with lender policies</div>
                      <div>Designing solutions that meet both client objectives and bank/NBFC requirements.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Complete transparency and regulatory compliance</div>
                      <div>Maintaining the highest standards of integrity, disclosure, and compliance.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Long-term value creation for every client</div>
                      <div>Focusing on sustainable financial outcomes rather than short-term transactions.</div>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="mt-6 text-gray-300 leading-relaxed">
                Our objective goes beyond loan facilitation—we strive to build enduring financial partnerships based on trust, expertise, and accountability.
              </p>
            </article>

            <article className="group relative rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Award className="h-6 w-6 text-[#F97415]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Our vision is to build a globally trusted financial advisory institution, recognized for integrity, transparency, deep banking expertise, and excellence in structured credit advisory—supported by scalable, compliant, and technology-driven operations.
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 border border-gray-700">
                <p className="text-sm font-semibold text-white mb-4">We aim to:</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Set industry benchmarks in loan structuring and credit advisory</div>
                      <div>By delivering consistently high standards of analysis, execution, and outcomes.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Expand across Pan-India and select international markets</div>
                      <div>Establishing a strong and credible presence across geographies.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Leverage advanced analytics, technology, and expert talent</div>
                      <div>To enhance decision-making, efficiency, and client experience.</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <div className="text-gray-300 leading-relaxed">
                      <div className="font-semibold text-white">Promote responsible financial access and inclusion</div>
                      <div>Serving individuals, startups, MSMEs, and enterprises across all stages of growth.</div>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="mt-6 text-gray-300 leading-relaxed">
                Our vision is driven by a long-term commitment to trust, innovation, and sustainable value creation for clients, partners, and stakeholders.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm mb-4">
              <TrendingUp className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Founder & <span className="text-[#F97415]">Roadmap</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Vision Card */}
            <article className="group relative rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Award className="h-6 w-6 text-[#F97415]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Founder's Vision</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Aamin Khan, Founder & Director, brings over 17 years of cross-sector experience spanning banking, loans, insurance, taxation, business coaching, and real estate. His vision is rooted in building a financial advisory platform defined by integrity, deep domain expertise, and absolute clarity in execution.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                Under his leadership, the firm is guided by a disciplined advisory philosophy—focused on understanding client needs through rigorous analysis, structuring solutions aligned with lender frameworks, and ensuring the right institutional fit for every case.
              </p>
              
              <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-5 border border-gray-700">
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#F97415]" />
                  Right Analysis. Right Structuring. Right Bank.
                </p>
              </div>

              <p className="mt-6 text-gray-300 leading-relaxed">
                This vision reflects a commitment to ethical advisory, transparent processes, and long-term value creation for clients, partners, and stakeholders.
              </p>
            </article>

            {/* Mission Card */}
            <article className="group relative rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 backdrop-blur-xl border border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#F97415]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Growth Roadmap</h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Infinity Loans & Business Solutions is progressing on a clearly defined, institution-led growth trajectory focused on scale, governance, and long-term sustainability.
                </p>

                <p className="text-gray-300 leading-relaxed">Our strategic roadmap includes:</p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white">Planned transition from proprietorship to a Private Limited structure</p>
                    <p className="text-gray-300 leading-relaxed">To strengthen corporate governance, transparency, and operational discipline.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Enhanced regulatory and compliance frameworks</p>
                    <p className="text-gray-300 leading-relaxed">Aligning operations with evolving regulatory standards and best practices.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Scalable and process-driven operations</p>
                    <p className="text-gray-300 leading-relaxed">Building systems and teams that support sustainable growth across geographies.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Strengthened institutional credibility</p>
                    <p className="text-gray-300 leading-relaxed">Creating a robust brand trusted by clients, partners, and stakeholders.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Deeper and long-term partnerships with Banks, NBFCs, and investors</p>
                    <p className="text-gray-300 leading-relaxed">Enabling broader product access, improved execution, and strategic capital alignment.</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  Our growth strategy is anchored in responsible expansion, strong governance, and a commitment to building a resilient financial advisory institution.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Lending Network Section */}
      <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
              <Users className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-white">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-[#F97415]">Infinity Loans</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Strategic placement, transparent advisory, and end-to-end ownership from profiling to disbursement.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {[
              {
                icon: Clock,
                title: "17+ Years of Industry Experience",
                description: "Deep domain expertise across lending, risk, and structuring.",
                color: "from-blue-500/10 to-blue-600/10",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-400"
              },
              {
                icon: Building2,
                title: "100+ Bank & NBFC Relationships",
                description: "Wide lender network to match policies with your profile.",
                color: "from-purple-500/10 to-purple-600/10",
                iconBg: "bg-purple-500/10",
                iconColor: "text-purple-400"
              },
              {
                icon: Users,
                title: "500+ Financial & Credit Experts",
                description: "Multi-disciplinary support across profiling, documentation, and follow-ups.",
                color: "from-green-500/10 to-green-600/10",
                iconBg: "bg-green-500/10",
                iconColor: "text-green-400"
              },
              {
                icon: CheckCircle2,
                title: "High Approval Ratio",
                description: "Better outcomes through policy-aligned structuring and placement.",
                color: "from-red-500/10 to-red-600/10",
                iconBg: "bg-red-500/10",
                iconColor: "text-red-400"
              },
              {
                icon: Award,
                title: "Specialized HNI & UHNI Advisory",
                description: "Large-ticket structuring and multi-bank negotiation support.",
                color: "from-orange-500/10 to-orange-600/10",
                iconBg: "bg-[#F97415]/10",
                iconColor: "text-[#F97415]"
              },
              {
                icon: TrendingUp,
                title: "Pan-India Reach",
                description: "Serving Tier 1 metros, Tier 2 & Tier 3 markets, emerging regions, all States and Union Territories — with select international cases.",
                color: "from-cyan-500/10 to-cyan-600/10",
                iconBg: "bg-cyan-500/10",
                iconColor: "text-cyan-400"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-[#F97415]/50 transition-all duration-500"
                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F97415]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F97415] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm mb-4">
              <Briefcase className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">Our Core</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Core Service <span className="text-[#F97415]">Segments</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Advisory-led structuring and execution across corporate, real estate, and high-value funding.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-7xl mx-auto">
            {[
              {
                label: "1.",
                icon: BriefcaseBusiness,
                title: "🔹 Private & Institutional Lending Services",
                content:
                  "Comprehensive secured and unsecured private lending solutions designed for businesses with diverse and complex capital requirements. We facilitate lending through private lenders, Venture Capital (VC) networks, strategic investors, and HNI & UHNI channels, supported by structured deal frameworks and strong governance standards.\n\nOur solutions include institutional, professional, and private lender–led lending, with customized lending structures developed through detailed eligibility assessment, credit evaluation, and due diligence. We support growth capital, expansion lending, and strategic lending requirements, aligned with long-term business objectives and sustainability.\n\n👉 Private lending solutions for small and large businesses, SMEs, corporates, factory owners, and industrialists, subject to profile evaluation and due diligence.\n\n💼 Lending Ticket Size\n\nINR 10 Lakhs to INR 1,000 Crores\n(Subject to borrower profile strength, legal & financial documentation, credit history, repayment track record, and overall risk assessment)",
              },
              {
                label: "2.",
                icon: BadgeAlert,
                title: "Our Strength – Genuine Solutions for Poor CIBIL Profiles",
                content:
                  "🔷 What type of cases do we consider?\n\nWe consider loan applications with poor CIBIL scores, EMI bounces, and past credit issues, only when there is a genuine and valid reason.\n\n🔷 Cases we accept:\n\n✔️ Low / Poor CIBIL Score\n✔️ EMI Bounces or Late Payments\n✔️ Settled or Closed Loan Accounts\n✔️ Credit issues due to COVID-19 impact\n✔️ Business loss followed by income stability\n✔️ Medical or family emergencies\n✔️ Temporary financial setbacks (currently resolved)\n\n⚠️ Important: We do not accept cases involving fraud, fake documents, or intentional defaults.\n\n🔷 Our Core Strength 💪\n\n👉 We evaluate repayment capability, not just the CIBIL score\n\nEach profile is assessed based on:\n\nCurrent income stability\n\nBank statement cash flow\n\nAvailable security (if any)\n\nGenuine reason explanation\n\nFuture repayment capacity\n\n🔷 Genuine Reason is Mandatory 📝\n\nTo process any poor CIBIL case, a clear and genuine explanation is required, such as:\n\nMedical emergency\n\nCOVID-related income loss\n\nTemporary business slowdown\n\nJob change or salary delay\n\nFamily emergency\n\nApplications without a genuine reason are not processed.\n\n🔷 Available Loan Solutions 🏦\n\n1️⃣ Secured Loan Options\n\nLoan Against Property\n\nGold Loan\n\nLoan Against Fixed Deposit / Insurance\n\n✔️ Higher approval chances even with poor CIBIL\n\n2️⃣ Co-Applicant / Guarantor Based Loans\n\nFamily member with good CIBIL score\n\nCombined income strength\n\n✔️ Reduced risk for lenders\n✔️ Improved approval possibility\n\n3️⃣ Step-by-Step Loan Strategy\n\nStart with a small loan amount\n\nMaintain regular EMIs for 6–9 months\n\nBecome eligible for higher loan amounts or top-ups\n\n✔️ Helps rebuild credit profile over time\n\n🔷 Our Process (Transparent & Legal) 🔍\n\n1️⃣ Profile assessment (CIBIL & income)\n2️⃣ Verification of genuine reason\n3️⃣ Recommendation of the most suitable solution\n4️⃣ Proper documentation\n5️⃣ Transparent lender-based approval process\n\n❌ No fake documentation\n❌ No false promises\n❌ No approval guarantees\n\n📢 Clear Message for Clients 📢\n\n“If your CIBIL profile is weak but your current income is stable and your intent to repay is genuine, we help you find the most suitable and legal loan solution.”\n\n🔷 Why Choose Us? ⭐\n\n✔️ Honest and ethical guidance\n✔️ Risk-based lending solutions\n✔️ Client-focused approach\n✔️ Long-term relationship building\n✔️ Complete transparency\n\n⚠️ Important Disclaimer ⚠️\n\nLoan approval depends entirely on the lender’s policies and the applicant’s profile strength.\nWe assist only in identifying the best possible genuine options—approval is not guaranteed.\n\n🔥 Brand Power Line\n\n“We don’t judge your past credit score. We evaluate your present strength.”",
              },
              {
                label: "3.",
                icon: HandCoins,
                title: "🚨 HIGH EMI BURDEN? EMI RESTRUCTURING SUPPORT 🚨",
                content:
                  "💡 Struggling with High EMIs? We’re Here to Help\n\nIf your monthly EMIs are too high and causing financial pressure, you can approach us for EMI restructuring and EMI burden reduction, provided your situation is supported by a genuine financial reason.\n\n🎯 Who Should Contact Us\n\n✅ High monthly EMI pressure\n✅ Difficulty managing multiple loan EMIs\n✅ Reduced income impacting EMI payments\n✅ Financial stress due to medical or family emergencies\n✅ Temporary financial setback with recovery in progress\n\n💪 Our Core Strength\n\n✨ We specialise exclusively in EMI restructuring & EMI stress reduction\n✨ We focus on realistic, policy-based solutions — not false promises\n\n🔄 EMI Restructuring & Relief Support\n\nWe assist clients with:\n✔️ EMI restructuring as per lender policies\n✔️ Reduction of monthly EMI through tenure adjustment (subject to approval)\n✔️ Alignment of EMI commitments with current income\n✔️ Guidance on managing EMI stress legally and responsibly\n\n👉 Our goal: Reduce EMI pressure and restore financial balance\n\n🧾 Genuine Reason is Mandatory\n\nEMI restructuring assistance is provided only when supported by a genuine reason, such as:\n📌 Medical emergency\n📌 Temporary income reduction\n📌 Job change or salary delay\n📌 Business slowdown\n📌 Family financial responsibility\n\n⚠️ Cases without a genuine reason are not processed\n\n🔍 Our Transparent & Ethical Process\n\n1️⃣ EMI and income assessment\n2️⃣ Verification of genuine financial difficulty\n3️⃣ Identification of suitable restructuring options\n4️⃣ Guidance strictly as per lender policies\n5️⃣ Clear and transparent communication at every stage\n\n❌ No fake documents\n❌ No misleading commitments\n❌ No approval guarantees\n\n📢 Clear Message for Clients\n\n💬 “If high EMIs are creating stress and your financial difficulty is genuine, we help you explore legal and practical EMI restructuring solutions.”\n\n⭐ Why Choose Us\n\n🏆 Honest and ethical advisory\n🏆 EMI-focused financial solutions\n🏆 Policy-compliant process\n🏆 Customer-first approach\n🏆 Long-term financial stability focus\n\n⚠️ Important Disclaimer\n\n🔒 EMI restructuring and EMI reduction outcomes are subject to lender policies and final approval.\n🔒 We provide assistance and guidance only—results cannot be guaranteed.\n\n🔥 Brand Power Line\n\n💥 Reduce EMI Stress. Regain Financial Control. 💥\n\n📞 Call to Action\n\n📲 High EMI burden? Don’t wait.\n👉 Contact us today for professional EMI restructuring support.",
              },
              {
                label: "4.",
                icon: Scale,
                title: "🏢 Transparent Property-Based Loan & EMI Restructuring Solutions",
                content:
                  "✅ 100% Legal | RBI-Compliant | Customer-First Approach\n\n🤝 Our Commitment\n\nWe provide ethical, transparent, and policy-compliant financial assistance for clients seeking property-based loan solutions or EMI restructuring support.\n\nAll our services are delivered strictly in accordance with banking regulations and lender policies.\n\n🏠 Property Valuation – Our Clear Policy\n\nProperty valuation for loan purposes is conducted strictly as per current market value, based on independent and authorised valuer reports.\n\n✔️ Valuation is based on the present market value at the time of loan application\n✔️ Future or expected appreciation is not considered during initial loan approval\n✔️ Artificial or inflated valuation is neither supported nor encouraged\n\nAll valuations and loan structures follow the guidelines issued by the Reserve Bank of India (RBI) and respective bank/NBFC policies.\n\n📊 How Loan Amount Is Determined\n\nLoan eligibility is calculated using Loan-to-Value (LTV) norms, which generally include:\n\n🏡 Home Loans: As per bank policy and applicable LTV limits\n🏢 Loan Against Property (LAP): A percentage of the current market value\n\n📌 Final loan amount and approval are entirely subject to lender discretion and policy.\n\n📈 Future Property Value – Our Honest Approach\n\nWhile property values may increase over time, banks and NBFCs:\n\n✔️ Consider only the current market value at the time of loan sanction\n✔️ May reassess the property at a later stage for:\n    🔹 Top-up loans\n    🔹 Loan enhancement\n    🔹 Balance transfer\n\nAny reassessment is done only in the future, based on updated valuation and repayment history.\n\n🔄 EMI Restructuring & High EMI Burden Support\n\nWe also assist clients facing high EMI burden, provided the situation is supported by a genuine financial reason.\n\n💡 Our EMI-related assistance includes:\n\n✔️ Guidance on lender-approved EMI restructuring options\n✔️ EMI reduction through tenure modification (subject to approval)\n✔️ Financial stress assessment and solution mapping\n\n🎯 Our objective is to reduce EMI stress legally, responsibly, and sustainably.\n\n🚫 What We Do Not Support\n\n❌ Inflated or manipulated property valuation\n❌ Fake or misleading documentation\n❌ False promises or guaranteed approvals\n❌ Any practice outside bank or NBFC policies\n\n🔍 Our Process\n\n1️⃣ Profile and requirement assessment\n2️⃣ Verification of income, property, and financial stress\n3️⃣ Policy-based solution recommendation\n4️⃣ Transparent coordination with banks/NBFCs\n5️⃣ Clear communication at every stage\n\n⭐ Why Choose Us\n\n✔️ 100% legal and compliant approach\n✔️ Transparent and honest advisory\n✔️ Long-term financial stability focus\n✔️ Customer trust and ethical practices\n✔️ No misleading commitments\n\n⚠️ Important Disclaimer\n\nAll loan approvals, valuations, EMI restructuring, and top-up facilities are subject to bank/NBFC policies and final approval.\nWe provide assistance and guidance only and do not guarantee approvals or specific loan amounts.\n\n🏆 Our Professional Promise\n\n“We believe in honest valuation, responsible lending, and long-term financial well-being.”\n\n📞 Get in Touch\n\nIf you are looking for legal, transparent property-based loan guidance or EMI restructuring support,\n📩 contact us today for a professional consultation.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-[#F97415]/20 bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-6 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#F97415]/40"
                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#F97415]/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#F97415]/10 blur-3xl" />

                <div className="relative">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#F97415]/15">
                      <item.icon className="h-3.5 w-3.5 text-[#F97415]" />
                    </span>
                    <span className="text-[#F97415]">{item.label}</span>
                    {item.title}
                  </p>

                  {(() => {
                    const [preview, ...rest] = item.content.split("\n\n");
                    const remaining = rest.join("\n\n");

                    return (
                      <>
                        <p className="mt-5 text-sm leading-relaxed text-gray-200 whitespace-pre-line sm:text-base">
                          {preview}
                        </p>

                        {remaining ? (
                          <details className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <summary className="cursor-pointer select-none text-sm font-semibold text-white">
                              Read more
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-gray-200 whitespace-pre-line sm:text-base">
                              {remaining}
                            </p>
                          </details>
                        ) : null}
                      </>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-white">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Requirement to Disbursement <span className="text-[#F97415]">Workflow</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              A disciplined, end-to-end advisory framework designed to enhance approval quality, ensure policy alignment, and deliver predictable execution outcomes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                title: "STEP 01 | Requirement Understanding & Client Profiling",
                icon: "📌",
                step: "01",
                description:
                  "Detailed assessment of funding requirements and objectives\nEvaluation of borrower profile, business model, and risk appetite\nAlignment of short-term funding needs with long-term financial strategy\nOutcome: Clear credit strategy and eligibility direction",
              },
              {
                title: "STEP 02 | Credit, Financial & Risk Assessment",
                icon: "📊",
                step: "02",
                description:
                  "CIBIL score and detailed credit history review\nAnalysis of income strength and audited / management financials\nAssessment of banking conduct, existing liabilities, and exposure\nDocumentation readiness and regulatory compliance checks\nOutcome: Early risk identification and eligibility clarity",
              },
              {
                title: "STEP 03 | Internal Expert Committee Review",
                icon: "🧩",
                step: "03",
                description:
                  "Multi-disciplinary internal credit and structuring review\nPolicy-aligned structuring and lender suitability validation\nDocumentation accuracy, risk mitigation, and exception assessment\nOutcome: Higher approval confidence with reduced rework",
              },
              {
                title: "STEP 04 | Strategic Bank & NBFC Mapping",
                icon: "🏦",
                step: "04",
                description:
                  "Lender shortlisting from a network of 100+ Banks & NBFCs\nMapping borrower profiles to lender-specific credit policies\nOptimization of lender fit, pricing competitiveness, and turnaround time\nOutcome: Optimal lender placement and improved approval probability",
              },
              {
                title: "STEP 05 | Application Filing & Process Execution",
                icon: "📝",
                step: "05",
                description:
                  "End-to-end application management and submission\nDocumentation coordination and compliance checks\nContinuous lender communication and structured follow-ups\nReal-time status tracking and issue resolution\nOutcome: Smooth processing and timeline discipline",
              },
              {
                title: "STEP 06 | Sanction & Disbursement Support",
                icon: "💰",
                step: "06",
                description:
                  "Support through sanction issuance and clarifications\nFulfilment of conditions precedent (CPs)\nDisbursement coordination and transaction closure\nOutcome: Timely, transparent, and compliant fund release",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-[#F97415]/50 transition-all duration-500"
                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#F97415] mb-2">STEP {item.step}</div>
                    <h3 className="text-base font-semibold text-white leading-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Process Outcomes</h3>
              <ul className="space-y-3">
                {[
                  "Improved approval success ratio",
                  "Policy-compliant credit placement",
                  "Reduced processing timelines",
                  "Better portfolio quality and risk alignment",
                  "Stronger lender confidence and repeat business",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Advisory Philosophy</h3>
              <p className="text-gray-300">Right Analysis. Right Structuring. Right Bank.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Let's Build Your Financial Future with{" "}
                <span className="text-[#F97415]">Confidence</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Every loan is handled with expertise, integrity, and commitment—ensuring you receive the right financial solution at the right time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <button className="group relative px-8 py-4 bg-[#F97415] hover:bg-[#E06410] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    Contact Us Today
                  </button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20">
                    View All Services
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Compliance & Disclaimer: Infinity Loans & Business Solutions acts strictly as a financial advisory and loan facilitation firm. We do not provide loans directly. All loan sanctions, interest rates, terms, and disbursements are solely at the discretion of the respective Bank or NBFC, subject to their internal credit policies and regulatory norms.
          </p>
        </div>
      </section>
    </main>
  );
}