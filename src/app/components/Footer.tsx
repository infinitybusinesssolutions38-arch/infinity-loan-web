import { Phone, Mail, MapPin, Zap, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#F97415]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/logo2.png" 
                alt="LoanEase logo" 
                width={150} 
                height={150}
                className="h-30 w-auto"
              />
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">
                Why Choose Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 text-[#F97415] flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-white">Quick Approvals</p>
                    <p className="text-white/70 leading-relaxed">Fast and efficient loan processing for timely financial support.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#F97415] flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-white">Secure & Reliable</p>
                    <p className="text-white/70 leading-relaxed">Robust security standards to protect your data and transactions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#F97415] flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-white">Hassle-Free Process</p>
                    <p className="text-white/70 leading-relaxed">Simple documentation and a smooth, transparent application journey.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-[#F97415] flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-white">Accessible for All</p>
                    <p className="text-white/70 leading-relaxed">Financing solutions designed to be inclusive, straightforward, and easy to understand.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-6 h-6 mt-0.5 text-[#F97415] flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white/70 mb-1">Call us at</p>
                  <Link 
                    href="tel:+919579880841" 
                    className="font-medium hover:text-[#F97415] transition-colors"
                  >
                    +91 9579880841
                  </Link>
                  <div className="mt-1">
                    <Link 
                      href="tel:+919766169660" 
                      className="font-medium hover:text-[#F97415] transition-colors"
                    >
                      +91 9766616960
                    </Link>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 mt-0.5 text-[#F97415] flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white/70 mb-1">Email us</p>
                  <Link 
                    href="mailto:business@infinityloanservices.com" 
                    className="font-medium hover:text-[#F97415] transition-colors break-all"
                  >
                    business@infinityloanservices.com
                  </Link>
                  <div className="mt-1">
                    <Link 
                      href="mailto:businessservicesinfinity@gmail.com" 
                      className="font-medium hover:text-[#F97415] transition-colors break-all"
                    >
                      businessservicesinfinity@gmail.com
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Offices</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-0.5 text-[#F97415] flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Corporate & Registered Office</p>
                  <p className="text-white/70">
                    8th Floor, Magnum Tower – 1,
                    <br />
                    Golf Course Extension Road, Sector 58,
                    <br />
                    Gurugram, Haryana – 122098, India
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-0.5 text-[#F97415] flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">New Delhi Office</p>
                  <p className="text-white/70">
                    505, Surya Kiran Building,
                    <br />
                    15, Kasturba Gandhi Marg,
                    <br />
                    New Delhi – 110001, India
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-0.5 text-[#F97415] flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Hyderabad Office</p>
                  <p className="text-white/70">
                    6-3-247/22/8,
                    <br />
                    Dwarakapuri Colony, Punjagutta,
                    <br />
                    Hyderabad, Telangana – 500082, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              {new Date().getFullYear()} Infinity Loans & Business Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-white/60 hover:text-[#F97415] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-services" 
                className="text-sm text-white/60 hover:text-[#F97415] transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/disclaimer" 
                className="text-sm text-white/60 hover:text-[#F97415] transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}