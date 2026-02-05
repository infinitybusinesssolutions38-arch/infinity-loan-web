import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/logo2.png" 
                alt="LoanEase logo" 
                width={150} 
                height={150}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for quick and hassle-free loan approvals. 
              We make financing simple and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about-us" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Call us at</p>
                  <Link 
                    href="tel:+919579880841" 
                    className="font-medium hover:text-primary transition-colors"
                  >
                    +91 9579880841
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Email us</p>
                  <Link 
                    href="mailto:business@infinityloanservices.com" 
                    className="font-medium hover:text-primary transition-colors break-all"
                  >
                    business@infinityloanservices.com
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Visit us</p>
                  <p className="font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} LoanEase. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link 
                href="" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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