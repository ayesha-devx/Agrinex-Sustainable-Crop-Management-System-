import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/agrinex icon.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Nutrients', path: '/nutrients' },
    { name: 'Crop Prediction', path: '/crop' },
    { name: 'Fertilizer', path: '/fertilizer' },
    { name: 'Disease Detect', path: '/disease' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className="fixed-top transition-all duration-300"
      style={{ 
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.4s ease'
      }}
    >
      <div className="container-fluid" style={{ maxWidth: '1450px', padding: '0.3rem 4rem' }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          
          {/* LOGO SECTION */}
          <Link to="/" className="d-flex align-items-center text-decoration-none" style={{ gap: '4px' }}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src={logo} alt="Logo" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
            </motion.div>
            <span className="h4 mb-0 font-weight-bold" style={{ 
              color: '#166534', 
              letterSpacing: '-0.04em', 
              fontWeight: '900',
              fontSize: '2.1rem',
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
            }}>
              Agri<span style={{ color: '#16a34a' }}>Nex</span>
            </span>
          </Link>

          {/* NAV LINKS GROUP */}
          <div className="d-none d-lg-flex align-items-center gap-5">
            <div className="d-flex align-items-center" style={{ gap: '48px' }}>
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="nav-link-custom text-decoration-none position-relative py-2"
                    style={{ 
                      fontSize: '1.4rem', 
                      fontWeight: active ? '700' : '600',
                      color: active ? '#16a34a' : '#374151',
                      letterSpacing: '-0.01em',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {link.name}
                    {(active) && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="position-absolute bottom-0 start-0 w-100 bg-success"
                        style={{ height: '2.5px', borderRadius: '4px' }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="d-lg-none btn border-0 p-2 shadow-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={32} color="#166534" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="d-lg-none bg-white w-100 overflow-hidden"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
          >
            <div className="container py-4 flex-column d-flex gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-decoration-none fs-5 py-2 font-weight-bold ${isActive(link.path) ? 'text-success' : 'text-dark'}`}
                  style={{ fontWeight: '700' }}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/crop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-success rounded-pill w-100 py-3 mt-2 font-weight-bold d-none"
              >
                Try Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-custom { transition: opacity 0.2s ease; }
        .nav-link-custom:hover { opacity: 0.8; color: #166534 !important; }
        .font-weight-bold { font-weight: 700; }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </nav>
  );
};

export default Navbar;