import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Leaf, Droplets, Thermometer, Wind, ArrowRight, ShieldCheck, Activity, MapPin, Gauge } from 'lucide-react';
import cornAnimation from '../assets/Corn Growing no ground.json';
import loadingAnimation from '../assets/Loading screen.json';

// --- STATE & CITY DATA ---
const stateCityData = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Adoni", "Amaravati", "Anantapur", "Chandragiri", "Chittoor", "Dowlaiswaram", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", "Nagarjunakoṇḍa", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram", "Yemmiganur"],
  "Arunachal Pradesh": ["Itanagar"],
  "Assam": ["Dhuburi", "Dibrugarh", "Dispur", "Guwahati", "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia"],
  "Bihar": ["Ara", "Barauni", "Begusarai", "Bettiah", "Bhagalpur", "Bihar Sharif", "Bodh Gaya", "Buxar", "Chapra", "Darbhanga", "Dehri", "Dinapur Nizamat", "Gaya", "Hajipur", "Jamalpur", "Katihar", "Madhubani", "Motihari", "Munger", "Muzaffarpur", "Patna", "Purnia", "Pusa", "Saharsa", "Samastipur", "Sasaram", "Sitamarhi", "Siwan"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Ambikapur", "Bhilai", "Bilaspur", "Dhamtari", "Durg", "Jagdalpur", "Raipur", "Rajnandgaon"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["Delhi", "New Delhi"],
  "Goa": ["Madgaon", "Panaji"],
  "Gujarat": ["Ahmedabad", "Amreli", "Bharuch", "Bhavnagar", "Bhuj", "Dwarka", "Gandhinagar", "Godhra", "Jamnagar", "Junagadh", "Kandla", "Khambhat", "Kutch", "Mahesana", "Morbi", "Nadiad", "Navsari", "Okha", "Palanpur", "Patan", "Porbandar", "Rajkot", "Surat", "Surendranagar", "Valsad", "Veraval"],
  "Haryana": ["Ambala", "Bhiwani", "Chandigarh", "Faridabad", "Firozpur Jhirka", "Gurugram", "Hansi", "Hisar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Panipat", "Pehowa", "Rewari", "Rohtak", "Sirsa", "Sonipat"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Dalhousie", "Dharmshala", "Hamirpur", "Kangra", "Kullu", "Mandi", "Nahan", "Shimla", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Baramula", "Doda", "Gulmarg", "Jammu", "Kathua", "Leh", "Punch", "Rajauri", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Chaibasa", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Hazaribag", "Jamshedpur", "Jharia", "Rajmahal", "Ranchi", "Saraikela"],
  "Karnataka": ["Badami", "Ballari", "Bengaluru", "Belagavi", "Bhadravati", "Bidar", "Chikkamagaluru", "Chitradurga", "Davangere", "Halebid", "Hassan", "Hubballi-Dharwad", "Kalaburagi", "Kolar", "Madikeri", "Mandya", "Mangaluru", "Mysuru", "Raichur", "Shivamogga", "Shravanabelagola", "Shrirangapattana", "Tumakuru", "Vijayapura"],
  "Kerala": ["Alappuzha", "Vatakara", "Idukki", "Kannur", "Kochi", "Kollam", "Kottayam", "Kozhikode", "Mattancherry", "Palakkad", "Thalassery", "Thiruvananthapuram", "Thrissur"],
  "Ladakh": ["Kargil", "Leh"],
  "Madhya Pradesh": ["Balaghat", "Barwani", "Betul", "Bharhut", "Bhind", "Bhojpur", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dr. Ambedkar Nagar (Mhow)", "Guna", "Gwalior", "Hoshangabad", "Indore", "Itarsi", "Jabalpur", "Jhabua", "Khajuraho", "Khandwa", "Khargone", "Maheshwar", "Mandla", "Mandsaur", "Morena", "Murwara", "Narsimhapur", "Narsinghgarh", "Narwar", "Neemuch", "Nowgong", "Orcha", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Sarangpur", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Ujjain", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Bhusawal", "Bid", "Buldhana", "Chandrapur", "Daulatabad", "Dhule", "Jalgaon", "Kalyan", "Karli", "Kolhapur", "Mahabaleshwar", "Malegaon", "Matheran", "Mumbai", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Pandharpur", "Parbhani", "Pune", "Ratnagiri", "Sangli", "Satara", "Sevagram", "Solapur", "Thane", "Ulhasnagar", "Vasai-Virar", "Wardha", "Yavatmal"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Cherrapunji", "Shillong"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Mon", "Phek", "Wokha", "Zunieboto"],
  "Odisha": ["Balangir", "Baleshwar", "Baripada", "Bhubaneshwar", "Brahmapur", "Cuttack", "Dhenkanal", "Keonjhar", "Konark", "Koraput", "Paradip", "Phulabani", "Puri", "Sambalpur", "Udayagiri"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  "Punjab": ["Amritsar", "Batala", "Chandigarh", "Faridkot", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Nabha", "Patiala", "Rupnagar", "Sangrur"],
  "Rajasthan": ["Abu", "Ajmer", "Alwar", "Amer", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittaurgarh", "Churu", "Dhaulpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Kishangarh", "Kota", "Merta", "Nagaur", "Nathdwara", "Pali", "Phalodi", "Pushkar", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"],
  "Sikkim": ["Gangtok", "Gyalshing", "Lachung", "Mangan"],
  "Tamil Nadu": ["Arcot", "Chengalpattu", "Chennai", "Chidambaram", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanniyakumari", "Kodaikanal", "Kumbakonam", "Madurai", "Mamallapuram", "Nagappattinam", "Nagercoil", "Palayamkottai", "Pudukkottai", "Rajapalayam", "Ramanathapuram", "Salem", "Thanjavur", "Tiruchchirappalli", "Tirunelveli", "Tiruppur", "Thoothukudi", "Udhagamandalam", "Vellore"],
  "Telangana": ["Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nizamabad", "Sangareddy", "Warangal"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Amroha", "Ayodhya", "Azamgarh", "Bahraich", "Ballia", "Banda", "Bara Banki", "Bareilly", "Basti", "Bijnor", "Bithur", "Budaun", "Bulandshahr", "Deoria", "Etah", "Etawah", "Faizabad", "Fatehpur", "Fatehpur Sikri", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hardoi", "Hathras", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Lakhimpur", "Lalitpur", "Lucknow", "Mainpuri", "Mathura", "Meerut", "Mirzapur-Vindhyachal", "Moradabad", "Muzaffarnagar", "Partapgarh", "Pilibhit", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Shahjahanpur", "Sitapur", "Sultanpur", "Tehri", "Varanasi"],
  "Uttarakhand": ["Almora", "Dehra Dun", "Haridwar", "Mussoorie", "Nainital", "Pithoragarh"],
  "West Bengal": ["Alipore", "Alipur Duar", "Asansol", "Baharampur", "Bally", "Balurghat", "Bankura", "Baranagar", "Barasat", "Barrackpore", "Basirhat", "Bhatpara", "Bishnupur", "Budge Budge", "Burdwan", "Chandernagore", "Darjeeling", "Diamond Harbour", "Dum Dum", "Durgapur", "Halisahar", "Haora", "Hugli", "Ingraj Bazar", "Jalpaiguri", "Kalimpong", "Kamarhati", "Kanchrapara", "Kharagpur", "Cooch Behar", "Kolkata", "Krishnanagar", "Malda", "Midnapore", "Murshidabad", "Nabadwip", "Palashi", "Panihati", "Purulia", "Raiganj", "Santipur", "Shantiniketan", "Shrirampur", "Siliguri", "Siuri", "Tamluk", "Titagarh"]
};

// --- CROP LIST ---
const cropList = [
    "Rice", "Maize", "Chickpea", "Kidney Beans", "Pigeon Peas", "Moth Beans",
    "Mung Bean", "Black Gram", "Lentil", "Pomegranate", "Banana", "Mango",
    "Grapes", "Watermelon", "Muskmelon", "Apple", "Orange", "Papaya",
    "Coconut", "Cotton", "Jute", "Coffee"
];

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorous: '', pottasium: '', ph: '', rainfall: '', state: '', city: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle State Selection (Update Cities list)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' }); 
    setAvailableCities(stateCityData[selectedState] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
        ...formData,
        nitrogen: Number(formData.nitrogen),
        phosphorous: Number(formData.phosphorous),
        pottasium: Number(formData.pottasium),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall)
    };

    try {
      // Simulate slight delay for the beauty of the loading screen
      await new Promise(r => setTimeout(r, 1500));
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/predict_crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Prediction failed.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setError("Server connection failed.");
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
              background: 'rgba(255,255,255,0.9)', 
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            <div className="loading-lottie-container">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-4 display-6 font-weight-bold text-success text-center"
            >
              Generating Optimal Crop Strategy...
            </motion.div>
            <p className="text-muted lead font-weight-bold text-center mt-2 px-5">Cross-referencing soil nutrients and climate data to predict maximum yield stability.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {!prediction ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="row align-items-center justify-content-start g-5 py-5"
          >
            {/* LEFT SIDE: FORM */}
            <div className="col-lg-8 form-column">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card prediction-card p-4 p-md-5 shadow-2xl"
                style={{ background: 'white', border: '1px solid rgba(22, 163, 74, 0.1)' }}
              >
                <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start mb-4 mb-sm-5">
                   <div className="bg-success text-white p-4 rounded-4 me-0 me-sm-4 mb-3 mb-sm-0 shadow-lg d-inline-flex align-items-center justify-content-center">
                      <Activity size={32} />
                   </div>
                   <div>
                      <h2 className="display-6 font-weight-bold mb-0" style={{ color: '#064e3b' }}>Predict Optimal Crop</h2>
                      <p className="text-muted mb-0">Enter your soil analytics for high-precision results.</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>Nitrogen (N)</label>
                      <input type="number" name="nitrogen" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>Phosphorous (P)</label>
                      <input type="number" name="phosphorous" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="col-md-4">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>Potassium (K)</label>
                      <input type="number" name="pottasium" className="form-control py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 50" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>pH Level</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0 rounded-start-4 px-4"><Gauge size={20} /></span>
                        <input type="number" step="0.01" name="ph" className="form-control py-4 rounded-end-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 6.5" style={{ fontSize: '1.2rem' }} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>Rainfall (mm)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0 rounded-start-4 px-4"><Droplets size={20} /></span>
                        <input type="number" step="0.01" name="rainfall" className="form-control py-4 rounded-end-4 bg-light border-0 shadow-sm" onChange={handleChange} required placeholder="e.g. 200" style={{ fontSize: '1.2rem' }} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>State</label>
                      <select name="state" className="form-select py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleStateChange} required value={formData.state} style={{ fontSize: '1.2rem' }}>
                        <option value="">Select State</option>
                        {Object.keys(stateCityData).sort().map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold text-success text-uppercase mb-2" style={{ fontSize: '0.9rem', letterSpacing: '0.05rem' }}>City</label>
                      <select name="city" className="form-select py-4 rounded-4 bg-light border-0 shadow-sm" onChange={handleChange} required value={formData.city} disabled={!formData.state} style={{ fontSize: '1.2rem' }}>
                        <option value="">Select City</option>
                        {availableCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger mt-4 rounded-4 border-0">{error}</div>}

                  <div className="mt-5">
                    <button type="submit" className="btn btn-success w-100 py-4 rounded-pill font-weight-bold shadow-2xl transform-hover" style={{ background: 'linear-gradient(135deg, #16a34a 0%, #064e3b 100%)', border: 'none', fontSize: '1.4rem' }}>
                      Analyze Field Data <ArrowRight size={24} className="ms-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* RIGHT SIDE: ANIMATION */}
            <div className="col-lg-5 order-first order-lg-last animation-column">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="d-flex flex-column align-items-center justify-content-center text-center position-relative"
              >
                {/* Soft Green Glow */}
                <div style={{ 
                  position: 'absolute', width: '400px', height: '400px', 
                  background: 'rgba(74, 222, 128, 0.25)', 
                  filter: 'blur(120px)', borderRadius: '50%', zIndex: -1 
                }}></div>

                <motion.div 
                  animate={{ y: [0, -30, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="crop-lottie-container"
                >
                  <Lottie animationData={cornAnimation} loop={true} />
                </motion.div>
                
                <h2 className="display-4 font-weight-bold mt-2" style={{ color: '#064e3b', lineHeight: '1.2' }}>Your Land, <br/> Our <span className="text-success">Precision.</span></h2>
                <p className="text-muted lead px-lg-5 mt-3" style={{ fontSize: '1.25rem' }}>Input your soil metrics to discover the most profitable and sustainable crop for your specific location.</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* SHOW RESULTS */
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="row justify-content-center py-5"
          >
            <div className="col-md-9 text-center">
              <div className="glass-card result-card p-4 p-md-5 shadow-2xl position-relative overflow-hidden" style={{ background: 'white' }}>
                  <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05 }}><Leaf size={300} /></div>
                  
                  <div className="mb-4 d-inline-block p-4 rounded-circle bg-success shadow-lg text-white">
                    <ShieldCheck size={64} />
                  </div>
                  
                  <h6 className="text-uppercase text-success font-weight-bold mb-3 letter-spacing-1">Analysis Complete</h6>
                  <h1 className="display-2 font-weight-bold mb-4" style={{ color: '#064e3b' }}>
                    Recommended: <br/> 
                    <span style={{ 
                        background: 'linear-gradient(to right, #16a34a, #064e3b)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                    }}>{prediction}</span>
                  </h1>
                  
                  <p className="lead mx-auto text-muted mb-5" style={{ maxWidth: '750px', fontSize: '1.4rem', lineHeight: '1.6' }}>
                    Based on your soil's Nitrogen, Phosphorus, Potassium, pH levels, and historical rainfall in <span className="text-success">{formData.city}</span>, our system confirms that <span className="font-weight-bold text-dark">{prediction}</span> will yield the best harvest results.
                  </p>
                  
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                    <button 
                      className="btn btn-success py-4 px-5 rounded-pill shadow-lg font-weight-bold" 
                      onClick={() => setPrediction(null)}
                      style={{ fontSize: '1.2rem' }}
                    >
                      New Analysis
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
        .letter-spacing-1 { letter-spacing: 0.2em; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
        .prediction-card {
          border-radius: 28px !important;
        }
        .result-card {
          border-radius: 28px !important;
        }
        .form-column {
          margin-left: 0 !important;
        }
        .animation-column {
          margin-left: 0 !important;
        }
        .loading-lottie-container {
          width: 280px !important;
        }
        .crop-lottie-container {
          width: 250px !important;
          max-width: 250px !important;
        }
        @media (max-width: 768px) {
          .display-2 {
            font-size: 2.2rem !important;
          }
          .display-4 {
            font-size: 2.0rem !important;
          }
        }
        @media (min-width: 576px) {
          .loading-lottie-container {
            width: 400px !important;
          }
        }
        @media (min-width: 992px) {
          .prediction-card {
            border-radius: 50px !important;
          }
          .result-card {
            border-radius: 50px !important;
          }
          .form-column {
            margin-left: -5rem !important;
          }
          .animation-column {
            margin-left: -1.5rem !important;
          }
          .crop-lottie-container {
            width: 100% !important;
            max-width: 520px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CropPrediction;