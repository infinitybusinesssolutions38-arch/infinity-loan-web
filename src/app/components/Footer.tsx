import { hl } from "./highlight-ui";
import { Phone, Mail, MapPin, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className={hl.footerContainer}>
            <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00AEEF]/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 justify-items-center md:justify-items-start">
                    {/* Brand Section */}
                    <div className="space-y-4 w-full max-w-xs md:max-w-sm justify-self-center text-center md:text-left">
                        <div className="flex justify-center md:justify-start">
                            <Image
                                src="/infinity-logo.png"
                                alt="Infinity Loans & Business Solutions"
                                width={140}
                                height={168}
                                className="h-24 w-auto object-contain sm:h-28 md:h-32"
                            />
                        </div>
                        <div className="space-y-3">
                            <h4 className={hl.footerTitle}>Why Choose Us</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Zap className={hl.footerIconBox} />
                                    <div className="text-sm">
                                        <p className="font-medium text-[#1A1A1A]">Quick Approvals</p>
                                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                            Fast and efficient loan processing for timely financial support.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className={hl.footerIconBox} />
                                    <div className="text-sm">
                                        <p className="font-medium text-[#1A1A1A]">Secure & Reliable</p>
                                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                            Robust security standards to protect your data and transactions.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className={hl.footerIconBox} />
                                    <div className="text-sm">
                                        <p className="font-medium text-[#1A1A1A]">Hassle-Free Process</p>
                                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                            Simple documentation and a smooth, transparent application journey.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="w-full max-w-xs md:max-w-sm justify-self-center text-center md:text-left">
                        <h4 className={hl.footerTitle}>Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className={hl.footerIconBox} />
                                <div className="text-sm">
                                    <p className="text-gray-600 mb-1">Call us at</p>
                                    <Link href="tel:+919579880841" className={hl.footerLink}>
                                        +91 9579880841
                                    </Link>
                                    <div className="mt-1">
                                        <Link href="tel:+919766616960" className={hl.footerLink}>
                                            +91 9766616960
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className={hl.footerIconBox} />
                                <div className="text-sm">
                                    <p className="text-gray-600 mb-1">Email us</p>
                                    <Link
                                        href="mailto:business@infinityloanservices.com"
                                        className={`${hl.footerLink} block`}
                                    >
                                        business@infinityloanservices.com
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Offices */}
                    <div className="w-full max-w-xs md:max-w-sm justify-self-center text-center md:text-left">
                        <h4 className={hl.footerTitle}>Offices</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <MapPin className={hl.footerIconBox} />
                                <div className="text-sm">
                                    <p className="font-medium text-[#1A1A1A]">
                                        Corporate & Registered Office
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                        8th Floor, Magnum Tower – 1,
                                        <br />
                                        Golf Course Extension Road, Sector 58,
                                        <br />
                                        Gurugram, Haryana – 122098, India
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="h-px w-full bg-[#D6EEF8] my-4" />

                <div className={hl.footerSection}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                        <p className={hl.footerLink}>
                            © {new Date().getFullYear()} Infinity Loans & Business Solutions. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                            <Link href="/privacy-policy" className={hl.footerLink}>
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-services" className={hl.footerLink}>
                                Terms of Service
                            </Link>
                            <Link href="/disclaimer" className={hl.footerLink}>
                                Disclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
