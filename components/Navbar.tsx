"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link href="/" className="navbar-logo" onClick={closeMenu}>
          Hire<span>Hub</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <Link href="/">Home</Link>
          <Link href="/jobs">Find Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/career-advice">Career Advice</Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="desktop-actions">

          {/* THEME BUTTON */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link href="/login" className="login-link">
            Login
          </Link>

          <Link href="/register" className="signup-button">
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="mobile-nav">

          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/jobs" onClick={closeMenu}>
            Find Jobs
          </Link>

          <Link href="/companies" onClick={closeMenu}>
            Companies
          </Link>

          <Link href="/career-advice" onClick={closeMenu}>
            Career Advice
          </Link>

          {/* MOBILE THEME BUTTON */}
          <button
            type="button"
            className="mobile-theme-button"
            onClick={toggleTheme}
          >
            {theme === "dark"
              ? "☀️ Switch to Light Mode"
              : "🌙 Switch to Dark Mode"}
          </button>

          <div className="mobile-divider" />

          <Link
            href="/login"
            className="mobile-login"
            onClick={closeMenu}
          >
            Login
          </Link>

          <Link
            href="/register"
            className="mobile-signup"
            onClick={closeMenu}
          >
            Sign Up
          </Link>

        </div>
      )}
    </header>
  );
}