"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
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