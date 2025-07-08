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
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/30 ">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-3xl font-extrabold text-yellow-400 hover:text-indigo-500 transition"
        >
          Business Nexus
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700 ">
          {navItems.map(({ name, path }) => (
            <li key={name} className="relative group">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition-colors hover:text-indigo-500 ${
                    isActive ? "text-indigo-600 font-semibold" : ""
                  }`
                }
              >
                {name}
              </NavLink>
              {/* Animated underline */}
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-indigo-600" />
            ) : (
              <Menu className="w-7 h-7 text-indigo-600" />
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
            className="md:hidden bg-white  border-t border-gray-200  overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 px-6 py-6 text-gray-700  font-semibold">
              {navItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 transition-colors hover:text-indigo-500 ${
                        isActive ? "text-indigo-600" : ""
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
