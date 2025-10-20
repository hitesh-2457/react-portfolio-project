import React, { useEffect } from "react";
import NavBar from './components/NavBar.tsx';
import Home from './sections/home/home.tsx';
import About from './sections/about/about.tsx';
import Splash from './sections/splash/splash.tsx';
import Console from './components/Console.tsx';
import Experience from './sections/experience/experience.tsx';
import Projects from './sections/projects/projects.tsx';
import Contact from './sections/contact/contact.tsx';
import { NavigationProvider } from './contexts/NavigationContext.tsx';

const App: React.FC = () => {
  useEffect(() => {
    // Smooth navigation links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Active navigation tracking
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`a[data-link="${id}"]`);
        if (link) {
          if (entry.isIntersecting) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }, { threshold: 0.25 });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => io.observe(section));

    // Navbar appearance changes
    const heroObserver = new IntersectionObserver((entries) => {
      const navbar = document.querySelector('.navbar');
      entries.forEach(entry => {
        if (entry.target.hasAttribute('data-hero')) {
          if (entry.isIntersecting) {
            navbar?.classList.add('on-hero');
          } else {
            navbar?.classList.remove('on-hero');
          }
        }
      });
    }, { threshold: 0.1 });

    const heroSection = document.querySelector('[data-hero]');
    if (heroSection) heroObserver.observe(heroSection);

    return () => {
      io.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <NavigationProvider>
      <Splash duration={1500} />
      <main>
        <NavBar />
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Console autoToggleDelay={1500} />
      </main>
    </NavigationProvider>
  );
};

export default App;
