import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import plantAnimation from '../assets/plant-animation.json';
import greenEarthAnimation from '../assets/Greenify the Earth.json';
import {
  Sprout,
  FlaskConical as Flask,
  Bug,
  CloudSun,
  ArrowRight,
  ShieldCheck,
  Zap,
  Leaf,
  ChevronRight,
  Globe,
  CheckCircle2,
  Sun,
  Droplets,
  Wind,
  TreePine,
  Thermometer
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Home = () => {
  return (
    <div className="home-container" style={{ overflow: 'hidden' }}>

      {/* --- PREMIUM EXPANDED WIDE HERO --- */}
      <section className="hero-section relative min-vh-100 d-flex align-items-center overflow-hidden" style={{
        position: 'relative',
        paddingTop: '80px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', // Soft organic gradient
        borderBottom: '1px solid rgba(22, 163, 74, 0.1)',
      }}>
        {/* Subtle Decorative Sunbeams */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <div className="animate-breathe" style={{ 
            position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', 
            background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)', filter: 'blur(50px)' 
          }}></div>
          <div className="animate-spin-slow" style={{ 
            position: 'absolute', bottom: '10%', left: '5%', width: '30vw', height: '30vw', 
            background: 'radial-gradient(circle, rgba(134,239,172,0.07) 0%, transparent 70%)', filter: 'blur(40px)' 
          }}></div>
        </div>

        {/* Subtle Tech-Grid Pattern Overlay */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'radial-gradient(rgba(22, 163, 74, 0.05) 1px, transparent 1px)', 
          backgroundSize: '30px 30px', 
          opacity: 0.8, zIndex: 0 
        }}></div>

        {/* Floating Environmental Decorative Icons - With Parallax feel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <div className="animate-float" style={{ position: 'absolute', top: '12%', left: '8%', opacity: 0.35, color: '#16a34a' }}><Leaf size={52} /></div>
          <div className="animate-float" style={{ position: 'absolute', bottom: '20%', left: '3%', opacity: 0.25, color: '#15803d', animationDelay: '1s' }}><Sprout size={64} /></div>
          <div className="animate-float" style={{ position: 'absolute', top: '25%', right: '12%', opacity: 0.3, color: '#166534', animationDelay: '2s' }}><Sun size={58} /></div>
          <div className="animate-float" style={{ position: 'absolute', bottom: '25%', right: '5%', opacity: 0.22, color: '#22c55e', animationDelay: '3s' }}><Droplets size={46} /></div>
          <div className="animate-float" style={{ position: 'absolute', top: '40%', left: '15%', opacity: 0.2, color: '#16a34a', animationDelay: '1.5s' }}><Wind size={40} /></div>
          <div className="animate-float" style={{ position: 'absolute', top: '10%', right: '35%', opacity: 0.28, color: '#15803d', animationDelay: '2.5s' }}><TreePine size={44} /></div>
          <div className="animate-float" style={{ position: 'absolute', bottom: '15%', left: '40%', opacity: 0.24, color: '#166534', animationDelay: '4s' }}><Thermometer size={38} /></div>
        </motion.div>

        <div className="container-agrinex" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center gx-lg-5 gy-5">

            {/* HERO TEXT */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >


                <h1 className="font-weight-bold mb-4 hero-title" style={{
                  color: '#064e3b',
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  fontSize: 'clamp(2.4rem, 8vw, 6rem)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <span style={{ whiteSpace: 'nowrap' }}>Grow <span className="animated-gradient-text">Smarter.</span></span>
                  <span style={{ whiteSpace: 'nowrap' }}>Harvest <span className="animated-gradient-text">Superior.</span></span>
                </h1>

                <p className="lead mb-3 hero-desc" style={{ color: '#374151', fontSize: '1.4rem', maxWidth: '750px', lineHeight: 1.6, fontWeight: '500' }}>
                  Transform your farming with production-grade insights. <br className="d-none d-md-block" /> Precision crop prediction and instant disease detection for the modern sustainable farm.
                </p>


              </motion.div>
            </div>

            {/* HERO ANIMATION */}
            <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
              <div className="float-animation" style={{ width: '100%', maxWidth: '650px', position: 'relative' }}>
                {/* Delicate Glow Behind Plant */}
                <div className="animate-breathe" style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  width: '120%', 
                  height: '120%', 
                  background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', 
                  filter: 'blur(60px)', 
                  zIndex: 0 
                }}></div>
                <Lottie
                  animationData={plantAnimation}
                  loop={true}
                  style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.1))' }}
                />
              </div>
            </div>
          </div>

          {/* STATS SECTION: Premium Glassmorphism */}
          <motion.div
            className="row g-4 pt-5"
            style={{ marginTop: '0' }}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { label: "Accuracy Rate", value: "98.5%", icon: <Zap size={24} />, desc: "Top-tier model precision" },
              { label: "Processing Speed", value: "0.4s", icon: <ShieldCheck size={24} />, desc: "Near-instant calculations" },
              { label: "Data points", value: "50+", icon: <Leaf size={24} />, desc: "Multi-parameter analysis" }
            ].map((stat, i) => (
              <motion.div key={i} className="col-lg-4" variants={fadeInUp}>
                <div className="p-4 d-flex align-items-center h-100 transition-all card-premium-glow" style={{
                  background: '#ffffff',
                  borderRadius: '32px',
                  border: '2px solid rgba(22, 163, 74, 0.1)',
                  boxShadow: '0 20px 50px -12px rgba(22, 163, 74, 0.12)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Subtle card internal glow */}
                  <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                  
                  <div className="me-4 p-3 rounded-4 shadow-sm" style={{ 
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', 
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-muted small font-weight-bold text-uppercase mb-1" style={{ letterSpacing: '0.12em', fontSize: '0.9rem' }}>{stat.label}</div>
                    <div className="h2 font-weight-bold mb-0" style={{ color: '#064e3b', fontSize: '2.4rem', letterSpacing: '-0.03em' }}>{stat.value}</div>
                    <div className="text-muted small" style={{ fontSize: '0.85rem', fontWeight: '500' }}>{stat.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SECTION: Premium Cards & Depth --- */}
      <section id="services" className="py-5 position-relative" style={{ 
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}>
        {/* Subtle background pattern/blob */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(22, 163, 74, 0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}></div>

        <div className="container-agrinex py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="text-center mb-5 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="display-4 font-weight-bold mb-3" style={{ 
                background: 'linear-gradient(135deg, #064e3b 0%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em' 
              }}>
                Core Capabilities
              </h2>
              <div className="mx-auto" style={{ height: '4px', width: '80px', background: 'linear-gradient(90deg, #16a34a, #15803d)', borderRadius: '2px', marginBottom: '24px' }}></div>
              <p className="text-secondary mx-auto" style={{ maxWidth: '650px', fontSize: '1.2rem', lineHeight: 1.7 }}>
                Empowering the modern farmer with actionable scientific data and intelligent monitoring solutions.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="row g-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: <Globe size={36} />, title: "Nutrient Analysis", desc: "Real-time tracking and 5-day predictive forecasting for crops.", link: "/nutrients", color: "#14532d" },
              { icon: <Sprout size={36} />, title: "Crop Prediction", desc: "Identify optimal crops based on soil nutrients and weather patterns.", link: "/crop", color: "#16a34a" },
              { icon: <Flask size={36} />, title: "Fertilizer Advice", desc: "Tailored NPK recommendations to maximize your soil fertility.", link: "/fertilizer", color: "#15803d" },
              { icon: <Bug size={36} />, title: "Disease Detect", desc: "Instant diagnosis for 38+ plant diseases from a single leaf photo.", link: "/disease", color: "#166534" }
            ].map((service, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <motion.div
                  className="p-4 p-sm-5 d-flex flex-column h-100 transition-all cursor-pointer shadow-hover"
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -15, 
                    boxShadow: `0 30px 60px -12px rgba(22, 163, 74, 0.4)`,
                    border: `1px solid rgba(22, 163, 74, 0.6)`
                  }}
                  style={{ 
                    borderRadius: '40px', 
                    border: '1px solid rgba(22, 163, 74, 0.4)',
                    background: 'linear-gradient(145deg, #064e3b 0%, #166534 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Enhanced Top Rim Light (Bright for Dark Theme) */}
                  <div className="position-absolute top-0 start-0 w-100" style={{ 
                    height: '2px', 
                    background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), rgba(255,255,255,0.4), rgba(34, 197, 94, 0.6), transparent)',
                    opacity: 1
                  }}></div>

                  {/* Rotating Border Glow Effect */}
                  <motion.div 
                    className="position-absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ 
                      top: '-50%', left: '-50%', width: '200%', height: '200%', 
                      background: `conic-gradient(from 0deg, transparent, rgba(22, 163, 74, 0.3), transparent)`,
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Ghosted Index Number (Lighter for Dark Theme) */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '-10px', 
                    right: '10px', 
                    fontSize: '6rem', 
                    fontWeight: '900', 
                    color: 'rgba(255, 255, 255, 0.05)',
                    userSelect: 'none',
                    zIndex: 0
                  }}>
                    0{idx + 1}
                  </div>

                  {/* Internal Hover Glow */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ 
                      position: 'absolute', 
                      bottom: '-20%', 
                      right: '-20%', 
                      width: '100%', 
                      height: '100%', 
                      background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)', 
                      zIndex: 0 
                    }}
                  />

                  <div className="position-relative" style={{ zIndex: 2 }}>
                    {/* Icon Circle */}
                    <motion.div 
                      className="mb-4 p-3 d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        backdropFilter: 'blur(10px)',
                        color: '#4ade80', 
                        width: '84px', 
                        height: '84px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' 
                      }}
                    >
                      {React.cloneElement(service.icon, { size: 42 })}
                    </motion.div>

                    <h4 className="font-weight-bold mb-3" style={{ color: '#ffffff', letterSpacing: '-0.04em', fontSize: '1.8rem' }}>{service.title}</h4>
                    <p className="text-light" style={{ lineHeight: 1.8, fontSize: '1.3rem', flexGrow: 1, opacity: 0.85 }}>{service.desc}</p>
                    
                    <Link 
                      to={service.link} 
                      className="nav-link p-0 mt-5 d-flex align-items-center font-weight-bold transition-all group" 
                      style={{ color: '#4ade80', fontSize: '1.5rem' }}
                    >
                      <span className="me-2 text-white">Explore Tool</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={20} className="text-white" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating Organic Elements in Background */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '20%', left: '5%', opacity: 0.1, color: '#16a34a' }}
        >
          <Leaf size={48} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '15%', right: '8%', opacity: 0.1, color: '#16a34a' }}
        >
          <Leaf size={32} />
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-5 bg-white">
        <div className="container-agrinex py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <motion.div 
                className="d-flex align-items-center justify-content-center" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="hero-earth-animation" style={{ width: '100%', maxWidth: '800px' }}>
                  <Lottie animationData={greenEarthAnimation} loop={true} />
                </div>
              </motion.div>
            </div>
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="display-5 font-weight-bold mb-4" style={{ color: '#064e3b' }}>Why AgriNex?</h2>
                <div className="d-flex flex-column gap-4">
                  {[
                    { icon: <ShieldCheck size={36} style={{ color: '#16a34a' }} />, title: "Trusted Analytics", text: "Enterprise-grade algorithms ensuring precision and reliability." },
                    { icon: <Zap size={36} style={{ color: '#16a34a' }} />, title: "Instant Insights", text: "Get results in milliseconds, not hours or days." },
                    { icon: <CheckCircle2 size={36} style={{ color: '#16a34a' }} />, title: "Sustainable Focus", text: "Promoting farming methods that respect the planet." }
                  ].map((feat, idx) => (
                    <div key={idx} className="d-flex gap-4 p-3 rounded-4 transition-all hover-light-bg align-items-center">
                      <div className="flex-shrink-0">{feat.icon}</div>
                      <div>
                        <h5 className="h3 font-weight-bold mb-2" style={{ color: '#111827' }}>{feat.title}</h5>
                        <p className="text-secondary mb-0" style={{ lineHeight: 1.6, fontSize: '1.3rem' }}>{feat.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-5 mb-5">
        <div className="container-agrinex py-5">
          <motion.div
            className="text-center p-4 p-sm-5 position-relative overflow-hidden shadow-lg premium-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #064e3b 0%, #15803d 100%)',
              borderRadius: '40px'
            }}
          >
            <h2 className="display-4 font-weight-bold mb-4 text-white">Ready for a better harvest?</h2>
            <p className="mb-5 mx-auto text-white opacity-90" style={{ maxWidth: '700px', fontSize: '1.4rem', lineHeight: 1.6 }}>
              Join thousands of smart farmers using AgriNex to optimize their yields with precision digital technology.
            </p>
            <Link to="/nutrients" className="btn btn-light py-3 px-5 rounded-pill font-weight-bold shadow-lg" style={{ fontSize: '1.1rem', color: '#064e3b' }}>
              Start Analysis Now <ArrowRight size={20} className="ms-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        .transition-all { transition: all 0.5s ease; }
        .transition-all:hover { transform: translateY(-10px); }
        .animated-gradient-text {
          background: linear-gradient(90deg, #22c55e 0%, #14532d 50%, #22c55e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          font-weight: 800;
        }
        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 992px) {
          .hero-section {
            padding-top: 100px !important;
            min-height: auto !important;
            padding-bottom: 40px;
          }
          .hero-title {
            text-align: center;
            align-items: center;
          }
          .hero-desc {
            text-align: center;
            font-size: 1.15rem !important;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-features {
            justify-content: center !important;
          }
          .float-animation {
            margin-top: -40px !important;
          }
        }
        
        @media (min-width: 992px) {
          .hero-earth-animation {
            margin-left: -180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;