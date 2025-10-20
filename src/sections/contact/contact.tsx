import React from "react";
import { useSectionRegistration } from "../../hooks/useSectionRegistration";

const Contact: React.FC = () => {
  // Register this section for navigation
  useSectionRegistration({ id: 'contact', label: 'Contact' });

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-slate-50">
    <div className="max-w-4xl mx-auto px-6 allow-free-scroll">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold title-gradient-light">Get In Touch</h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Let’s connect and explore opportunities to build something reliable together.
        </p>
      </div>
      <div className="space-y-4 max-w-2xl mx-auto">
        <a
          href="https://www.linkedin.com/in/hitesh-gupta-tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 grid place-items-center mr-4">
            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17.34V10.34H6.03V17.34H8.34M7.19 9.31A1.32 1.32 0 1 0 7.18 6.67A1.32 1.32 0 0 0 7.19 9.31M18 17.34V13.61C18 11.6 16.93 10.6 15.29 10.6A3.05 3.05 0 0 0 12.93 11.83H12.9V10.34H10.72V17.34H12.96V13.98C12.96 13.05 13.28 12.29 14.29 12.29C15.28 12.29 15.33 13.13 15.33 14.04V17.34Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">LinkedIn</h3>
            <p className="text-sm text-slate-600">linkedin.com/in/hitesh-gupta-tr</p>
          </div>
        </a>
        <a
          href="https://github.com/hitesh-2457"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 grid place-items-center mr-4">
            <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12 6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">GitHub</h3>
            <p className="text-sm text-slate-600">github.com/hitesh-2457</p>
          </div>
        </a>
        <a
          href="mailto:hiteshguptatr@outlook.com"
          className="flex items-center p-5 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 rounded-full bg-violet-100 grid place-items-center mr-4">
            <svg className="w-6 h-6 text-violet-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 8L12 13L4 8V6L12 11L20 6Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Email</h3>
            <p className="text-sm text-slate-600">hiteshguptatr@outlook.com</p>
          </div>
        </a>
        <div className="mt-4">
          <a
            id="download-resume-bottom"
            href="https://drive.google.com/uc?export=download&id=1V3cBIf9R1YQapMYayuVD6O7PyQi51Zq3"
            className="btn-primary w-full inline-flex items-center justify-center"
          >
            Download Resume
          </a>
        </div>
      </div>
      <p className="mt-12 text-center text-slate-500 text-sm">
        Designed & Built by Hitesh Gupta T R. Hosted on AWS Amplify.
      </p>
    </div>
  </section>
  );
};

export default Contact;
