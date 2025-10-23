"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Analytics", href: "/analytics" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white/5 border-r border-white/10 p-5 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-400">⚙️ GadgetApp</h2>
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <header className="md:hidden flex justify-between items-center px-5 py-4 bg-white/10 border-b border-white/10">
        <h2 className="text-xl font-bold text-indigo-400">⚙️ GadgetApp</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-gray-900/95 border-l border-white/10 p-6 flex flex-col z-50 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-indigo-400">⚙️ Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
