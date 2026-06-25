import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant py-10 no-print">
      <div className="w-full px-8 flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto gap-8">
        {/* Brand */}
        <div className="flex flex-col items-start gap-3">
          <Link to="/" className="text-xl font-extrabold text-primary font-headline">ResumeIQ</Link>
          <p className="text-on-surface-variant text-sm">
            © 2024 ResumeIQ AI. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Help Center</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">API Docs</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            href="#"
            title="Share"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </a>
          <a
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            href="#"
            title="Contact"
          >
            <span className="material-symbols-outlined text-[20px]">alternate_email</span>
          </a>
          <a
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            href="#"
            title="LinkedIn"
          >
            <span className="material-symbols-outlined text-[20px]">business_center</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
