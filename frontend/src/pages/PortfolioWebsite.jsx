import React from 'react';

const PortfolioWebsite = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-center py-6">
        <div className="flex space-x-4">
          <NavLink text="About" />
          <NavLink text="Articles" />
          <NavLink text="Projects" />
          <NavLink text="Speaking" />
          <NavLink text="Uses" />
        </div>
        <div className="absolute right-8">
          <button className="rounded-full p-2 border border-gray-700">
            <SunIcon />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <img 
            src="/profile-pic.jpg" 
            alt="Profile" 
            className="w-16 h-16 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">
            Software designer, founder, <br />
            and amateur astronaut.
          </h1>
          <p className="text-gray-400 mb-6 max-w-2xl">
            I'm Spencer, a software designer and entrepreneur based in New York City. I'm the founder and 
            CEO of Planetaria, where we develop technologies that empower regular people to explore 
            space on their own terms.
          </p>
          <div className="flex space-x-4">
            <SocialIcon type="twitter" />
            <SocialIcon type="instagram" />
            <SocialIcon type="github" />
            <SocialIcon type="linkedin" />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-5 gap-4 mb-16">
          <img src="/images/cockpit.jpg" alt="Cockpit" className="rounded-lg h-40 w-full object-cover" />
          <img src="/images/conference.jpg" alt="Conference" className="rounded-lg h-40 w-full object-cover" />
          <img src="/images/workspace.jpg" alt="Workspace" className="rounded-lg h-40 w-full object-cover" />
          <img src="/images/mountains.jpg" alt="Mountains" className="rounded-lg h-40 w-full object-cover" />
          <img src="/images/mars.jpg" alt="Mars" className="rounded-lg h-40 w-full object-cover" />
        </div>

        {/* Articles Section */}
        <div className="mb-16">
          <Article 
            date="September 5, 2022"
            title="Crafting a design system for a multiplanetary future"
            content="Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system."
          />
          
          <Article 
            date="September 2, 2022"
            title="Introducing Animaginary: High performance web animations"
            content="When you're building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself."
          />
          
          <Article 
            date="July 14, 2022"
            title="Rewriting the cosmOS kernel in Rust"
            content="When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language, but it's been a while since I've seen an article on the front page of Hacker News about rewriting some important tool in Go and I see articles on there about rewriting things in Rust every single week."
          />
        </div>

        {/* Newsletter and Work Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="flex items-center text-sm font-semibold text-gray-400 mb-4">
              <EnvelopeIcon />
              <span className="ml-2">Stay up to date</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Get notified when I publish something new, and unsubscribe at any time.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex-grow mr-2"
              />
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md">
                Join
              </button>
            </div>
          </div>

          <div>
            <h2 className="flex items-center text-sm font-semibold text-gray-400 mb-4">
              <BriefcaseIcon />
              <span className="ml-2">Work</span>
            </h2>
            
            <WorkExperience 
              company="Planetaria" 
              position="CEO"
              period="2019 — Present"
              logo="/logos/planetaria.svg"
            />
            
            <WorkExperience 
              company="Airbnb" 
              position="Product Designer"
              period="2014 — 2019"
              logo="/logos/airbnb.svg"
            />
            
            <WorkExperience 
              company="Facebook" 
              position="iOS Software Engineer"
              period="2011 — 2014"
              logo="/logos/facebook.svg"
            />
            
            <WorkExperience 
              company="Starbucks" 
              position="Shift Supervisor"
              period="2008 — 2011"
              logo="/logos/starbucks.svg"
            />
            
            <button className="mt-6 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md w-full flex items-center justify-center">
              <span>Download CV</span>
              <DownloadIcon />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <FooterLink text="About" />
            <FooterLink text="Projects" />
            <FooterLink text="Speaking" />
            <FooterLink text="Uses" />
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 Spencer Sharp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const NavLink = ({ text }) => (
  <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-800">
    {text}
  </a>
);

const FooterLink = ({ text }) => (
  <a href="#" className="text-gray-400 hover:text-white">
    {text}
  </a>
);

const SocialIcon = ({ type }) => {
  return (
    <a href="#" className="text-gray-400 hover:text-white">
      <span className="sr-only">{type}</span>
      <div className="w-6 h-6"></div>
    </a>
  );
};

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const Article = ({ date, title, content }) => (
  <article className="mb-12">
    <div className="text-gray-500 text-sm mb-2">{date}</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-400 mb-3">{content}</p>
    <a href="#" className="text-sm flex items-center text-teal-400 hover:text-teal-300">
      Read article
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </a>
  </article>
);

const WorkExperience = ({ company, position, period, logo }) => (
  <div className="flex items-center mb-4">
    <img src={logo} alt={company} className="w-10 h-10 rounded-full bg-gray-800 p-2" />
    <div className="ml-4 flex-grow">
      <div className="font-medium">{company}</div>
      <div className="text-sm text-gray-400">{position}</div>
    </div>
    <div className="text-sm text-gray-500">{period}</div>
  </div>
);

export default PortfolioWebsite;