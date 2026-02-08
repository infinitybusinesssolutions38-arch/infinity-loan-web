// import { InfiniteSlider } from '@/components/ui/infinite-slider'
// import { ProgressiveBlur } from '@/components/ui/progressive-blur'
// import sbiLogo from "@/components/bank logos/SBI-logo.svg.png"
// import auLogo from "@/components/bank logos/au-small-finance-bank-limited-logo-png_seeklogo-333683.png"
// import axisLogo from "@/components/bank logos/axis-bank-logo-png_seeklogo-14775.png"
// import bobLogo from "@/components/bank logos/bank-of-baroda-logo-png_seeklogo-195534.png"
// import hdfcLogo from "@/components/bank logos/hdfc-bank-limited-logo-png_seeklogo-289647.png"
// import hsbcLogo from "@/components/bank logos/hsbc-private-bank-logo-png_seeklogo-481153.png"
// import iciciLogo from "@/components/bank logos/icici-bank-logo-png_seeklogo-69551.png"
// import idfcLogo from "@/components/bank logos/idfc-first-bank-logo-png_seeklogo-556504.png"
// import kotakLogo from "@/components/bank logos/kotak-mahindra-bank-logo-png_seeklogo-304220.png"
// import pnbLogo from "@/components/bank logos/punjab-national-bank-pnb-logo-png_seeklogo-386963.png"
// import Image from 'next/image'

// export default function LogoCloud() {
//     const logos = [
//         { src: sbiLogo, alt: "SBI" },
//         { src: hdfcLogo, alt: "HDFC Bank" },
//         { src: iciciLogo, alt: "ICICI Bank" },
//         { src: axisLogo, alt: "Axis Bank" },
//         { src: kotakLogo, alt: "Kotak Mahindra Bank" },
//         { src: idfcLogo, alt: "IDFC First Bank" },
//         { src: pnbLogo, alt: "Punjab National Bank" },
//         { src: bobLogo, alt: "Bank of Baroda" },
//         { src: hsbcLogo, alt: "HSBC" },
//         { src: auLogo, alt: "AU Small Finance Bank" },
//     ];

//     return (
//         <section className="bg-background overflow-hidden py-10">
//             <div className="group relative mx-auto w-full max-w-7xl px-2">
//                 <div className="text-center mb-6">
//                     <p className="text-sm font-semibold text-muted-foreground">Trusted by leading banks & partners</p>
//                 </div>

//                 <div className="relative py-3">
//                     <InfiniteSlider speed={40} speedOnHover={20} gap={96}>
//                         {logos.map((logo, index) => (
//                             <div key={index} className="flex items-center">
//                                 <div className="relative h-14 w-36">
//                                     <Image
//                                         src={logo.src}
//                                         alt={logo.alt}
//                                         fill
//                                         sizes="144px"
//                                         className="object-contain"
//                                         priority={index < 2}
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </InfiniteSlider>

//                     <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20" />
//                     <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20" />
//                     <ProgressiveBlur
//                         className="pointer-events-none absolute left-0 top-0 h-full w-20"
//                         direction="left"
//                         blurIntensity={1}
//                     />
//                     <ProgressiveBlur
//                         className="pointer-events-none absolute right-0 top-0 h-full w-20"
//                         direction="right"
//                         blurIntensity={1}
//                     />
//                 </div>
//             </div>
//         </section>
//     )
// }


import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import sbiLogo from "@/components/bank logos/SBI-logo.svg.png"
import auLogo from "@/components/bank logos/au-small-finance-bank-limited-logo-png_seeklogo-333683.png"
import axisLogo from "@/components/bank logos/axis-bank-logo-png_seeklogo-14775.png"
import bobLogo from "@/components/bank logos/bank-of-baroda-logo-png_seeklogo-195534.png"
import hdfcLogo from "@/components/bank logos/hdfc-bank-limited-logo-png_seeklogo-289647.png"
import hsbcLogo from "@/components/bank logos/hsbc-private-bank-logo-png_seeklogo-481153.png"
import iciciLogo from "@/components/bank logos/icici-bank-logo-png_seeklogo-69551.png"
import idfcLogo from "@/components/bank logos/idfc-first-bank-logo-png_seeklogo-556504.png"
import kotakLogo from "@/components/bank logos/kotak-mahindra-bank-logo-png_seeklogo-304220.png"
import pnbLogo from "@/components/bank logos/punjab-national-bank-pnb-logo-png_seeklogo-386963.png"
import Image from 'next/image'
import { Handshake, Award, Shield, CheckCircle2 } from 'lucide-react'

export default function LogoCloud2() {
    const logos = [
        { src: sbiLogo, alt: "SBI" },
        { src: hdfcLogo, alt: "HDFC Bank" },
        { src: iciciLogo, alt: "ICICI Bank" },
        { src: axisLogo, alt: "Axis Bank" },
        { src: kotakLogo, alt: "Kotak Mahindra Bank" },
        { src: idfcLogo, alt: "IDFC First Bank" },
        { src: pnbLogo, alt: "Punjab National Bank" },
        { src: bobLogo, alt: "Bank of Baroda" },
        { src: hsbcLogo, alt: "HSBC" },
        { src: auLogo, alt: "AU Small Finance Bank" },
    ];

    const stats = [
        { icon: Handshake, label: "Bank Partners", value: "100+" },
        { icon: Shield, label: "Secure Process", value: "100%" },
        { icon: CheckCircle2, label: "Success Rate", value: "98%" },
    ];

    return (
        <section className="relative bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden py-16 lg:py-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGOTc0MTUiPjxwYXRoIGQ9Ik0zNiAzNHYyaDh2LTJoLTh6TTIwIDM0djJoOHYtMmgtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-slide" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#F97415]/30 rounded-full mb-6 shadow-md animate-fade-in">
                        <Award className="h-4 w-4 text-[#F97415]" />
                        <span className="text-sm font-bold text-[#F97415] uppercase tracking-wide">
                            Our Partners
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 animate-fade-in-up">
                        Trusted by Leading
                        <span className="block mt-2 bg-gradient-to-r from-[#F97415] via-orange-600 to-amber-600 bg-clip-text text-transparent">
                            Banks & Financial Institutions
                        </span>
                    </h2>

                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
                        We partner with 100+ top banks and NBFCs to bring you the best loan offers with competitive rates
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-100 hover:border-[#F97415]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97415]" strokeWidth={2.5} />
                                </div>
                                <p className="text-2xl sm:text-3xl font-black text-[#F97415] mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs sm:text-sm font-bold text-gray-600">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logo Slider Container */}
                <div className="relative py-8 animate-fade-in-up animation-delay-300">
                    {/* Decorative Border Top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent rounded-full" />

                    {/* Main Slider */}
                    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl overflow-hidden py-8 relative">
                        <InfiniteSlider speed={40} speedOnHover={20} gap={96}>
                            {logos.map((logo, index) => (
                                <div
                                    key={index}
                                    className="flex items-center group/logo"
                                >
                                    <div className="relative h-20 w-40 px-4 py-2 rounded-xl transition-all duration-300 group-hover/logo:bg-orange-50 group-hover/logo:scale-110">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            fill
                                            sizes="350px"
                                            className="object-cover filter transition-all duration-300"
                                            priority={index < 3}
                                        />
                                    </div>
                                </div>
                            ))}
                        </InfiniteSlider>

                        {/* Progressive Blur Overlays */}
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-24"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-24"
                            direction="right"
                            blurIntensity={1}
                        />

                        {/* Gradient Overlays for smooth fade */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                    </div>

                    {/* Decorative Border Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent rounded-full" />
                </div>

                {/* Trust Indicators */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 font-semibold animate-fade-in-up animation-delay-400">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#F97415]" />
                        <span>RBI Approved Partners</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-400" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#F97415]" />
                        <span>Secure & Transparent</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-400" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#F97415]" />
                        <span>Best Interest Rates</span>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 text-center animate-fade-in-up animation-delay-500">
                    <p className="text-sm text-gray-500 font-medium">
                        * Partner availability may vary based on location and loan eligibility
                    </p>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide {
                    0% {
                        transform: translateX(0) translateY(0);
                    }
                    100% {
                        transform: translateX(60px) translateY(60px);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }

                .animate-slide {
                    animation: slide 20s linear infinite;
                }

                .animation-delay-100 {
                    animation-delay: 100ms;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animation-delay-400 {
                    animation-delay: 400ms;
                }

                .animation-delay-500 {
                    animation-delay: 500ms;
                }
            `}</style>
        </section>
    )
}