import { useRef, useState } from "react";
import "./NavBar.css";
import LogoIcon from "./LogoIcon";
import { useNavigation } from "../contexts/NavigationContext";

function NavBar() {
  const navbarRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navItems } = useNavigation();

  // Toggle mobile menu
  const handleMenuClick = () => setMobileOpen((v) => !v);
  const handleMenuClose = () => setMobileOpen(false);

  const navLinks = (
    <>
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          data-link={item.id}
          className="navlink px-3 py-2"
          onClick={handleMenuClose}
        >
          {item.label}
        </a>
      ))}
    </>
  );
  const mobileLinks = (
    <>
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          data-link={item.id}
          className="navlink px-4 py-2"
          onClick={handleMenuClose}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <nav
      ref={navbarRef}
      className="navbar fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-11/12 max-w-6xl"
    >
      <div
        className="rounded-2xl px-4 sm:px-6 py-3.5 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(37,99,235,0.18))",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0 group outline-none"
          >
            <LogoIcon />
            <span className="brand-name text-sm sm:text-base font-extrabold group-hover:opacity-90 transition-opacity">
              Hitesh Gupta T R
            </span>
          </a>
          <div className="hidden md:flex justify-center items-center gap-1 flex-1">
            {navLinks}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              id="menuBtn"
              className="navlink md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl"
              onClick={handleMenuClick}
              aria-controls="mobileMenu"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="text-sm font-bold">Menu</span>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          id="mobileMenu"
          className={`md:hidden mt-3 pt-3 grid gap-2 transition-all duration-300 ${mobileOpen ? "" : "hidden"
            }`}
        >
          {mobileLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
