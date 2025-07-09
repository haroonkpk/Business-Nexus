import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "#features" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gradient-to-br from-pink-400 to-indigo-500 text-white rounded-full px-3 py-1 text-sm font-bold shadow-md"
          >
            Nexus
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
            Connect & Fund
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-300">
          {navItems.map(({ name, path }) => (
            <li key={name} className="relative group">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition-colors hover:text-white ${
                    isActive ? "text-white font-semibold" : ""
                  }`
                }
              >
                {name}
              </NavLink>
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
              />
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-pink-400" />
            ) : (
              <Menu className="w-7 h-7 text-indigo-400" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1e293b] border-t border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 px-6 py-6 text-gray-300 font-semibold">
              {navItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 transition-colors hover:text-white ${
                        isActive ? "text-white" : ""
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
