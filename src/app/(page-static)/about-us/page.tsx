import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, TrendingUp, Users, Award, Shield, Clock, CheckCircle2, Building2, Briefcase, Home, Wrench, User, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
                A financial advisory and loan facilitation firm focused on the right analysis, right structuring, and the right lender fit.
              </p>

              <p className="text-base text-gray-400 leading-relaxed">
                We assess requirements, profile risk, structure applications, and map each case to suitable Banks and NBFCs—staying involved from profiling to disbursement.
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
                  { label: "Network", value: "100+", subtitle: "Leading Banking Partners", icon: Building2 },
                  { label: "Partners", value: "100+", subtitle: "NBFCs & Financial Institutions", icon: Users },
                  { label: "Integration", value: "Multi", subtitle: "Fintech Platform Integrations", icon: Zap },
                  { label: "Support", value: "24/7", subtitle: "Dedicated Relationship Managers", icon: Award },
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
            <article className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Our Mission</h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Our mission is to deliver trusted, transparent, and expert-led financial advisory services that enable individuals and businesses to access the right funding solutions.
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200">
                <p className="text-sm font-semibold text-black mb-4">We are committed to:</p>
                <ul className="space-y-3">
                  {[
                    "In-depth credit and financial analysis",
                    "Ethical, unbiased, and client-first advisory",
                    "Accurate structuring aligned with lender policies",
                    "Full transparency and regulatory compliance",
                    "Long-term value creation for every client",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-gray-600 leading-relaxed">
                Our objective is not just loan facilitation, but building enduring financial partnerships.
              </p>
            </article>

            <article className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Our Vision</h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Our vision is to become a globally trusted financial advisory institution, recognized for integrity, transparency, deep banking expertise, structured credit advisory excellence, and scalable and compliant operations.
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200">
                <p className="text-sm font-semibold text-black mb-4">We aim to:</p>
                <ul className="space-y-3">
                  {[
                    "Set new benchmarks in loan structuring and advisory",
                    "Expand across Pan-India and international markets",
                    "Leverage analytics, technology, and expert talent",
                    "Promote financial inclusion across all business sizes",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start group/item">
                      <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
            <article className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Founder’s Vision</h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Aamin Khan (Founder & Director) brings 17+ years of experience across loans, banking, insurance, taxation, business coaching, and real estate—building a platform rooted in ethics, expertise, and clarity.
              </p>
              
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-5 border border-gray-200">
                <p className="text-sm font-semibold text-black flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#F97415]" />
                  Right Analysis. Right Structuring. Right Bank.
                </p>
              </div>
            </article>

            {/* Mission Card */}
            <article className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Growth Roadmap</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Infinity Loans & Business Solutions is on a structured institutional growth path",
                  "Planned transition from proprietorship to a Private Limited Company",
                  "Stronger corporate governance and regulatory compliance",
                  "Improved operational scalability and institutional credibility",
                  "Deeper partnerships with Banks, NBFCs, and investors"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start group/item">
                    <div className="w-5 h-5 rounded-full bg-[#F97415]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#F97415]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#F97415]" />
                    </div>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
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
                className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-[#F97415]/50 transition-all duration-500 hover:scale-105"
                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F97415]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F97415] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Solutions Section */}
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {[
              {
                icon: "💼",
                title: "Business & Corporate Loan Advisory",
                items: [
                  "Term Loans",
                  "Working Capital Facilities",
                  "MSME / SME Funding",
                  "Expansion and Growth Capital",
                  "Balance Sheet-Based Lending",
                  "Cash Flow-Based Lending",
                ],
                gradient: "from-blue-50 to-blue-100/50"
              },
              {
                icon: "🏗️",
                title: "Builder & Developer Funding",
                items: [
                  "Project Funding & Construction Finance",
                  "Land Acquisition & Development Funding",
                  "Structured Real Estate Finance",
                  "Residential, Commercial & Mixed-Use Projects",
                ],
                gradient: "from-purple-50 to-purple-100/50"
              },
              {
                icon: "👑",
                title: "HNI & UHNI Loan Advisory",
                items: [
                  "Large-Ticket Loan Structuring",
                  "Asset-Backed Financing",
                  "Customized Credit Solutions",
                  "Multi-Bank Negotiation Support",
                ],
                gradient: "from-green-50 to-green-100/50"
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-gray-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className="text-xl font-bold text-black group-hover:text-[#F97415] transition-colors flex-1">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 items-start group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 group-hover/item:bg-[#F97415] transition-colors flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Services */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
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
              A structured advisory flow designed for higher approval probability and smoother execution.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                title: "Requirement Understanding & Profiling",
                icon: "📌",
                step: "01",
                description:
                  "We assess the funding requirement, financial background, and long-term objectives to build the right credit strategy.",
              },
              {
                title: "Credit, Financial & Risk Analysis",
                icon: "📊",
                step: "02",
                description:
                  "CIBIL score and credit history, financial statements and income strength, banking conduct and liabilities, documentation and compliance readiness.",
              },
              {
                title: "Internal Expert Committee Review",
                icon: "🧩",
                step: "03",
                description:
                  "Multi-disciplinary review for policy-aligned structuring, accurate documentation, and higher approval probability.",
              },
              {
                title: "Strategic Bank & NBFC Mapping",
                icon: "🏦",
                step: "04",
                description:
                  "We shortlist lenders from our network of 100+ institutions whose credit policies best match the client’s profile.",
              },
              {
                title: "Application & Process Execution",
                icon: "📝",
                step: "05",
                description:
                  "We manage application filing, documentation coordination, lender communication, and continuous follow-ups.",
              },
              {
                title: "Sanction & Disbursement Support",
                icon: "💰",
                step: "06",
                description:
                  "We remain involved until sanction is issued, conditions are fulfilled, and funds are successfully disbursed.",
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
                    <h3 className="text-base font-semibold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
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