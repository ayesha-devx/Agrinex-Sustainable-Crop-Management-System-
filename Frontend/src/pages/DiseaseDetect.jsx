import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Leaf, Camera, Upload, ArrowRight, ShieldCheck, Activity, Microscope, AlertTriangle, CheckCircle } from 'lucide-react';
import virusAnimation from '../assets/Corona Virus Lottie animation.json';
import loadingAnimation from '../assets/Loading screen.json';

const DiseaseDetect = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      await new Promise(r => setTimeout(r, 2000));
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/predict_disease`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Disease detection failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5" style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* --- PREMIUM LOADING OVERLAY --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 9999, 
              background: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(15px)',
              display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            <div style={{ width: '400px' }}>
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-4 display-6 font-weight-bold text-success text-center"
              >
                Analyzing Pathogen Specimen...
              </motion.div>
              <p className="text-muted lead font-weight-bold text-center mt-2 px-5">Leveraging high-precision cellular scanning to identify plant health anomalies.</p>
          </motion.div>
        )}
      </AnimatePresence>

        <div className="container py-5 mt-5" style={{ position: 'relative', zIndex: 1 }}>
          {!prediction ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="row align-items-center justify-content-center g-5"
            >
            {/* LEFT SIDE: SCAN COMPONENT */}
            <div className="col-lg-8 pe-lg-5" style={{ marginLeft: '-4rem' }}>
               <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card p-5 shadow-2xl"
                style={{ borderRadius: '50px', background: 'white', border: '1px solid rgba(22, 163, 74, 0.1)' }}
              >
                <div className="d-flex align-items-center mb-5 pb-3">
                   <div className="bg-success text-white p-4 rounded-4 me-4 shadow-lg">
                      <Microscope size={32} />
                   </div>
                   <div>
                      <h2 className="display-6 font-weight-bold mb-0" style={{ color: '#064e3b' }}>Crop Disease Detection</h2>
                      <p className="text-muted mb-0">Identify plant pathogens and get instant treatment advice from a leaf specimen.</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* File Upload Zone */}
                  {!preview ? (
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="mb-4 position-relative"
                    >
                        <input 
                            type="file" 
                            className="position-absolute h-100 w-100 opacity-0 cursor-pointer" 
                            style={{ zIndex: 10 }}
                            onChange={handleImageChange} 
                            required 
                            accept="image/*" 
                        />
                        <div className="p-5 border-2 border-dashed rounded-4 text-center transition-all bg-light" style={{ borderColor: '#16a34a30', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="bg-white p-4 rounded-circle shadow-sm mb-3">
                                <Camera size={48} className="text-success" />
                            </div>
                            <h4 className="font-weight-bold text-dark mb-2">Upload Specimen Image</h4>
                            <p className="text-muted lead px-lg-5 mb-3">Drop an affected leaf image here or click to select from your device</p>
                            <span className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill font-weight-bold">High-Resolution Preferred</span>
                        </div>
                    </motion.div>
                  ) : (
                    <div className="mb-4 position-relative group">
                        <div className="rounded-4 overflow-hidden shadow-lg border-4 border-white" style={{ position: 'relative' }}>
                            <img src={preview} alt="Specimen Preview" className="w-100" style={{ height: '350px', objectFit: 'cover' }} />
                            {/* Scanner Line Animation Overlay */}
                            <motion.div 
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#16a34a', boxShadow: '0 0 15px #16a34a', zIndex: 5, opacity: 0.8 }}
                            />
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-dark btn-sm rounded-pill position-absolute top-0 end-0 m-3 shadow-lg px-3"
                            onClick={() => { setImage(null); setPreview(null); }}
                            style={{ zIndex: 10 }}
                        >
                            Change Image
                        </button>
                    </div>
                  )}

                  {error && <div className="alert alert-danger mb-4 rounded-4 border-0 shadow-sm">{error}</div>}

                  <div className="mt-5">
                    <button type="submit" className="btn btn-success w-100 py-4 rounded-pill font-weight-bold shadow-2xl transform-hover" style={{ background: 'linear-gradient(135deg, #16a34a 0%, #064e3b 100%)', border: 'none', fontSize: '1.4rem' }}>
                      START DIAGNOSIS <ArrowRight size={26} className="ms-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* RIGHT SIDE: VIRUS ANIMATION */}
            <div className="col-lg-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="d-flex flex-column align-items-center justify-content-center text-center position-relative"
              >
                <div style={{ 
                  position: 'absolute', width: '350px', height: '350px', 
                  background: 'rgba(22, 163, 74, 0.1)', 
                  filter: 'blur(120px)', borderRadius: '50%', zIndex: -1 
                }}></div>

                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: '100%', maxWidth: '800px' }}
                >
                  <Lottie animationData={virusAnimation} loop={true} />
                </motion.div>
                
                <h2 className="display-5 font-weight-bold mt-2" style={{ color: '#064e3b' }}>Protect Your <br/> <span className="text-success">Harvest.</span></h2>
                <p className="text-muted lead px-lg-5">Our neural network detects over 38 types of plant diseases with precision cellular analysis.</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="row align-items-center justify-content-center g-5 py-5"
          >
             {/* LEFT SIDE: SCAN RESULT */}
             <div className="col-lg-7">
              <div className="glass-card p-5 shadow-2xl position-relative overflow-hidden" style={{ borderRadius: '50px', background: 'white' }}>
                  <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05 }}><Leaf size={250} /></div>
                  
                  <div className="d-inline-flex align-items-center px-4 py-2 bg-success bg-opacity-10 text-success rounded-pill mb-4 border">
                    <span className="small font-weight-bold">System ConfirmationComplete</span>
                  </div>
                  
                  <div className="mb-5 d-flex align-items-center p-4 rounded-4 bg-light border-0">
                    <CheckCircle size={32} className="text-success me-3" />
                    <div>
                        <h4 className="font-weight-bold mb-0 text-success">Detection Complete</h4>
                        <p className="text-muted mb-0 small">The specialist scan has analyzed the specimen image with high confidence.</p>
                    </div>
                  </div>

                  <div 
                    className="prediction-content text-start mx-auto" 
                    style={{ color: '#1a2e05', fontSize: '1.3rem', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: prediction }}
                  ></div>
                  
                  <div className="mt-5 border-top pt-5 text-center">
                    <button 
                        className="btn btn-outline-success py-4 px-5 rounded-pill font-weight-bold border-2" 
                        onClick={() => {setPrediction(null); setPreview(null); setImage(null);}}
                        style={{ fontSize: '1.2rem' }}
                    >
                        New Specification Scan
                    </button>
                  </div>
              </div>
            </div>

            {/* RIGHT SIDE: ANIMATION (Mini Version) */}
            <div className="col-lg-5">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-center"
              >
                <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                  <Lottie animationData={virusAnimation} loop={true} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .glass-card { transition: all 0.4s ease; }
        .transform-hover:hover { transform: translateY(-3px) scale(1.02); }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
        .uppercase-xs { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .letter-spacing-1 { letter-spacing: 0.1em; }
        .prediction-content b, .prediction-content strong { color: #16a34a; font-weight: 800; }
        .cursor-pointer { cursor: pointer; }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default DiseaseDetect;