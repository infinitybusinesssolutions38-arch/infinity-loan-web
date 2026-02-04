// import React from 'react'

// const Footer = () => {
//     return (
//         <div className='bg-gray-100 shadow-sm'>
//             <footer className="flex  md:justify-around footer sm:footer-horizontal  bg-gray-100 p-10">
//                 <nav>
//                     <h6 className="footer-title">Services</h6>
//                     <a className="link link-hover">Branding</a>
//                     <a className="link link-hover">Design</a>
//                     <a className="link link-hover">Marketing</a>
//                     <a className="link link-hover">Advertisement</a>
//                 </nav>
//                 <nav>
//                     <h6 className="footer-title">Company</h6>
//                     <a className="link link-hover">About us</a>
//                     <a className="link link-hover">Contact</a>
//                     <a className="link link-hover">Jobs</a>
//                     <a className="link link-hover">Press kit</a>
//                 </nav>
//                 <nav>
//                     <h6 className="footer-title">Social</h6>
//                     <div className="grid grid-flow-col gap-4">
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//                             </svg>
//                         </a>
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//                             </svg>
//                         </a>
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//                             </svg>
//                         </a>
//                     </div>
//                 </nav>
//             </footer>
//             <div className="w-[90%] mx-auhref py-6">
//                 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident quos soluta temporibus.</p>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero harum omnis neque commodi praesentium rem. Eos molestiae, ullam nostrum explicabo, maiores laborum, soluta quae minima nobis tempore distinctio omnis doloribus. Ratione, perferendis quam.</p>
//             </div>
//         </div>
//     )
// }

// export default Footer


// import { Link } from '@/lib/router';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auhref px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={"/logo2.png"} alt='logo' width={150} height={150} />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for quick and hassle-free loan approvals. 
              We make financing simple and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register/borrower/personal" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link href="/register/borrower/business" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  Business Loan
                </Link>
              </li>
              {/* <li>
                <Link href="/track-application" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  Track Application
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Personal Loans</li>
              <li>Business Loans</li>
              <li>Working Capital</li>
              <li>Machinery Finance</li>
              <li>Business Expansion</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Call us at</p>
                  <p className="font-medium">+91 1800-XXX-XXXX</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Email us</p>
                  <p className="font-medium">support@loanease.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Visit us</p>
                  <p className="font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LoanEase. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-background transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}