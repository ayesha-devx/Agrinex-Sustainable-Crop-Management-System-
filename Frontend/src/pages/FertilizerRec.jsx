import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Leaf, Droplets, Thermometer, Wind, ArrowRight, ShieldCheck, Activity, MapPin, Gauge, Search, Sparkles } from 'lucide-react';
import plantAnimation from '../assets/green leave.json';
import loadingAnimation from '../assets/Loading screen.json';

// --- 1. FULL LIST OF CROPS ---
const allCrops = [
    { value: "almondnut", label: "Almond Nut" },
    { value: "aniseed", label: "Aniseed" },
    { value: "apple", label: "Apple" },
    { value: "apricot", label: "Apricot" },
    { value: "arecanut", label: "Arecanut" },
    { value: "asafoetida", label: "Asafoetida" },
    { value: "ashgourd", label: "Ash Gourd" },
    { value: "banana", label: "Banana" },
    { value: "barleyjav", label: "Barley(JAV)" },
    { value: "bayleaf", label: "Bay Leaf" },
    { value: "beetroot", label: "Beetroot" },
    { value: "bittergourd", label: "Bitter Gourd" },
    { value: "blackgram", label: "Black Gram" },
    { value: "blackpepper", label: "Black Pepper" },
    { value: "blackeyedbeanschawli", label: "Black eyed beans( chawli)" },
    { value: "bottlegourd", label: "Bottle Gourd" },
    { value: "brinjal", label: "Brinjal" },
    { value: "cabbage", label: "Cabbage" },
    { value: "capsicum", label: "Capsicum" },
    { value: "cardamom", label: "Cardamom" },
    { value: "carrot", label: "Carrot" },
    { value: "cashewnuts", label: "Cashewnuts" },
    { value: "cauliflower", label: "Cauliflower" },
    { value: "chickoo", label: "Chickoo" },
    { value: "chickpeaschanna", label: "Chickpeas(Channa)" },
    { value: "chili", label: "Chili" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "cloves", label: "Cloves" },
    { value: "clusterbeansgavar", label: "Cluster Beans(Gavar)" },
    { value: "coconut", label: "Coconut" },
    { value: "coffee", label: "Coffee" },
    { value: "corianderleaves", label: "Coriander leaves" },
    { value: "corianderseeds", label: "Coriander seeds" },
    { value: "cotton", label: "Cotton" },
    { value: "cucumber", label: "Cucumber" },
    { value: "cuminseeds", label: "Cumin seeds" },
    { value: "curryleaves", label: "Curry leaves" },
    { value: "custardapple", label: "Custard apple" },
    { value: "dates", label: "Dates" },
    { value: "drumstickmoringa", label: "Drumstick – moringa" },
    { value: "favabeanspapdival", label: "Fava beans (Papdi - Val)" },
    { value: "fenugreekleafmethi", label: "Fenugreek Leaf(methi)" },
    { value: "figs", label: "Figs" },
    { value: "frenchbeansfarasbi", label: "French Beans(Farasbi)" },
    { value: "garciniaindicakokam", label: "Garcinia indica(kokam)" },
    { double: "garlic", label: "Garlic" },
    { value: "ginger", label: "Ginger" },
    { value: "gooseberryamla", label: "Gooseberry(Amla)" },
    { value: "grapes", label: "Grapes" },
    { value: "greenpeas", label: "Green Peas" },
    { value: "guava", label: "Guava" },
    { value: "horsegramkulthi", label: "Horse Gram(kulthi)" },
    { value: "jackfruit", label: "Jackfruit" },
    { value: "jaiphalnutmeg", label: "Jaiphal(Nutmeg)" },
    { value: "jambunsyzygiumcumini", label: "Jambun(Syzygium cumini)" },
    { value: "jowarsorghum", label: "Jowar(Sorghum)" },
    { value: "jute", label: "Jute" },
    { value: "kidneybeans", label: "Kidney beans" },
    { value: "ladyfinger", label: "Lady Finger" },
    { value: "lemon", label: "Lemon" },
    { value: "lemongrass", label: "Lemon Grass" },
    { value: "lentilsmasoordal", label: "Lentils(Masoor Dal)" },
    { value: "limabeanspavta", label: "Lima beans(Pavta)" },
    { value: "maize", label: "Maize" },
    { value: "mango", label: "Mango" },
    { value: "mothbeanmatki", label: "Moth bean(Matki)" },
    { value: "mungbeans", label: "Mung beans" },
    { value: "mushroom", label: "Mushroom" },
    { value: "muskmelon", label: "Musk Melon" },
    { value: "mustardseeds", label: "Mustard seeds" },
    { value: "olive", label: "Olive" },
    { value: "onion", label: "Onion" },
    { value: "orange", label: "Orange" },
    { value: "papaya", label: "Papaya" },
    { value: "pineapple", label: "Pineapple" },
    { value: "pistachionut", label: "Pistachio Nut" },
    { value: "pomegranate", label: "Pomegranate" },
    { value: "potato", label: "Potato" },
    { value: "pumpkin", label: "Pumpkin" },
    { value: "radish", label: "Radish" },
    { value: "raginaachnnii", label: "Ragi( naachnnii)" },
    { value: "raisins", label: "Raisins" },
    { value: "rapeseedmohri", label: "Rapeseed (Mohri)" },
    { value: "rice", label: "Rice" },
    { value: "ridgegourd", label: "Ridgegourd" },
    { value: "sesameseed", label: "Sesame seed" },
    { value: "soyabean", label: "Soyabean" },
    { value: "spinach", label: "Spinach" },
    { value: "sunflower", label: "Sunflower" },
    { value: "sweetpotato", label: "Sweet Potato" },
    { value: "tamarind", label: "Tamarind" },
    { value: "tapiocasuran", label: "Tapioca(Suran)" },
    { value: "tomato", label: "Tomato" },
    { value: "turmeric", label: "Turmeric" },
    { value: "watermelon", label: "Water Melon" },
    { value: "ziziphusmauritianabor", label: "Ziziphus mauritiana(Bor)" },
    { value: "pigeonpeastoordal", label: "pigeon peas(Toor Dal)" }
];

const FertilizerRec = () => {
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorous: '', pottasium: '', cropname: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCrops = allCrops.filter(crop => 
    crop.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.cropname) {
        setError("Please select a crop from the list.");
        setLoading(false);
        return;
    }

    try {
      await new Promise(r => setTimeout(r, 1500));
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/recommend_fertilizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setRecommendation(data.recommendation);
      } else {
        setError(data.error || "Failed to get recommendation");
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
      
      {/* --- LOADING OVERLAY --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 9999, 
              background: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(10px)',
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
              className="mt-4 font-weight-bold text-success display-6 text-center"
            >
              Generating Nutrition Strategy...
            </motion.div>
            <p className="text-muted lead font-weight-bold text-center mt-2 px-5">Crunching soil metrics to deliver a high-precision fertilization plan.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container pt-5 mt-5" style={{ position: 'relative', zIndex: 1 }}>
        {!recommendation ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="row align-items-center justify-content-center g-5 py-5"
          >
            {/* LEFT SIDE: ANIMATION (Green Leaves) */}
            <div className="col-lg-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="d-flex flex-column align-items-center justify-content-center text-center position-relative"
              >
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: '100%', maxWidth: '700px' }}
                >
                  <Lottie animationData={plantAnimation} loop={true} style={{ mixBlendMode: 'multiply' }} />
                </motion.div>
                
                <h2 className="display-5 font-weight-bold mt-4" style={{ color: '#064e3b' }}>Healthy Roots, <br/> Richer <span className="text-success">Harvest.</span></h2>
              </motion.div>
            </div>

            {/* RIGHT SIDE: FORM */}
            <div className="col-lg-8 ms-auto">
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card p-5 shadow-lg"
                style={{ borderRadius: '40px', background: 'white', border: '1px solid rgba(22, 163, 74, 0.1)' }}
              >
                <div className="d-flex align-items-center mb-5 pb-3">
                   <div className="bg-success text-white p-4 rounded-4 me-4 shadow-lg">
                      <Sparkles size={32} />
                   </div>
                   <div>
                      <h2 className="display-6 font-weight-bold mb-0" style={{ color: '#064e3b' }}>Personalized Fertilizer Plan</h2>
                      <p className="text-muted mb-0">Provide your soil's NPK levels and select your crop for a custom strategy.</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '0.05rem' }}>Nitrogen</label>
                      <input type="number" name="nitrogen" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.25rem' }} />
                    </div>
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '0.05rem' }}>Phosphorous</label>
                      <input type="number" name="phosphorous" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.25rem' }} />
                    </div>
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '0.05rem' }}>Potassium</label>
                      <input type="number" name="pottasium" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.25rem' }} />
                    </div>
                    
                    <div className="col-12 mt-5">
                        <label className="font-weight-bold text-success text-uppercase d-flex align-items-center mb-3" style={{ fontSize: '1rem', letterSpacing: '0.05rem' }}>
                            <Leaf size={20} className="me-2" /> Targeted Crop Search
                        </label>
                        <div className="position-relative mt-2 mb-4">
                            <span className="position-absolute translate-middle-y top-50 start-0 ps-4 text-muted"><Search size={22} /></span>
                            <input 
                              type="text" 
                              className="form-control py-4 ps-5 rounded-4 bg-light border-0 shadow-sm" 
                              placeholder="Type to find your crop (e.g. Rice, Mango)..." 
                              style={{ fontSize: '1.25rem', paddingLeft: '3.5rem !important' }}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select 
                            name="cropname" 
                            className="form-select py-4 rounded-4 bg-light border-0 shadow-sm" 
                            onChange={handleChange} 
                            required
                            value={formData.cropname}
                            style={{ fontSize: '1.25rem' }}
                        >
                            <option value="">Select crop match...</option>
                            {filteredCrops.map((crop) => (
                                <option key={crop.value} value={crop.value}>
                                    {crop.label}
                                </option>
                            ))}
                        </select>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger mt-4 rounded-4 border-0">{error}</div>}

                  <div className="mt-5 pt-3">
                    <button type="submit" className="btn btn-success w-100 py-4 rounded-pill font-weight-bold shadow-2xl transform-hover" style={{ background: 'linear-gradient(135deg, #16a34a 0%, #064e3b 100%)', border: 'none', fontSize: '1.4rem' }}>
                      GET OPTIMIZED ADVICE <ArrowRight size={24} className="ms-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* SHOW RESULTS SECTION (Expanded Layout) */
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="row align-items-center justify-content-center gx-lg-24 g-5 py-5"
          >
            {/* LEFT SIDE: ANIMATION */}
            <div className="col-lg-5">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-center"
              >
                <div style={{ width: '100%', maxWidth: '450px', margin: '0 auto' }}>
                  <Lottie animationData={plantAnimation} loop={true} style={{ mixBlendMode: 'multiply' }} />
                </div>
                <h3 className="h2 font-weight-bold mt-4" style={{ color: '#064e3b' }}>Optimization <br/> <span className="text-success">Complete.</span></h3>
              </motion.div>
            </div>

            {/* RIGHT SIDE: RECOMMENDATION */}
            <div className="col-lg-7">
              <div className="glass-card p-5 shadow-2xl position-relative overflow-hidden" style={{ borderRadius: '50px', background: 'white' }}>
                  <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05 }}><Leaf size={250} /></div>
                  
                  <div className="d-inline-flex align-items-center px-4 py-2 bg-success bg-opacity-10 text-success rounded-pill mb-4 border">
                    <Sparkles size={16} className="me-2" />
                    <span className="small font-weight-bold uppercase-xs">Tailored Growth Protocol</span>
                  </div>
                  
                  <div 
                    className="prediction-content text-start mx-auto" 
                    style={{ color: '#1a2e05', fontSize: '1.3rem', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: recommendation }}
                  ></div>
                  
                  <div className="mt-5 border-top pt-5 text-center">
                    <button 
                        className="btn btn-outline-success py-4 px-5 rounded-pill font-weight-bold border-2" 
                        onClick={() => setRecommendation(null)}
                        style={{ fontSize: '1.2rem' }}
                    >
                        Rediagnose Soil
                    </button>
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .glass-card { transition: all 0.4s ease; }
        .transform-hover:hover { transform: translateY(-3px) scale(1.02); }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
        .shadow-sm-inset { box-shadow: inset 0 2px 4px rgba(0,0,0,0.03); }
        .uppercase-xs { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .prediction-content b, .prediction-content strong { color: #16a34a; }
      `}</style>
    </div>
  );
};

export default FertilizerRec;