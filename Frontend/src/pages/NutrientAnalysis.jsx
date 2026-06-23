import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Leaf, Droplets, Thermometer, Wind, ArrowRight } from 'lucide-react';
import leavesAnimation from '../assets/leaves (1).json';
import loadingAnimation from '../assets/Loading screen.json';

// --- STATE & CITY DATA ---
const stateCityData = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Adoni", "Amaravati", "Anantapur", "Chandragiri", "Chittoor", "Dowlaiswaram", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", "Nagarjunakoṇḍa", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram", "Yemmiganur"],
  "Arunachal Pradesh": ["Itanagar"],
  "Assam": ["Dhuburi", "Dibrugarh", "Dispur", "Guwahati", "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia"],
  "Bihar": ["Ara", "Barauni", "Begusarai", "Bettiah", "Bhagalpur", "Bihar Sharif", "Bodh Gaya", "Buxar", "Chapra", "Darbhanga", "Dehri", "Dinapur Nizamat", "Gaya", "Hajipur", "Jamalpur", "Katihar", "Madhubani", "Motihari", "Munger", "Muzaffarpur", "Patna", "Purnia", "Pusa", "Saharsa", "Samastipur", "Sasaram", "Sitamarhi", "Siwan"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Ambipapur", "Bhilai", "Bilaspur", "Dhamtari", "Durg", "Jagdalpur", "Raipur", "Rajnandgaon"],
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

const NutrientAnalysis = () => {
  const [formData, setFormData] = useState({
    crop: '',
    state: '',
    city: ''
  });
  const [result, setResult] = useState(null); 
  const [forecast, setForecast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);

  // Handle Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle State Change -> Update Cities
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' }); 
    setAvailableCities(stateCityData[selectedState] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setForecast(null);

    try {
      // Simulate slight delay for the premium feel
      await new Promise(r => setTimeout(r, 2000));
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/nutrient_analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result); 
        setForecast(data.forecast);
      } else {
        setError(data.error || "Failed to analyze nutrients");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5" style={{ position: 'relative', overflowX: 'hidden' }}>
        
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
                Synchronizing Soil & Weather Data...
              </motion.div>
              <p className="text-muted lead font-weight-bold text-center mt-2 px-5">Retrieving real-time meteorology and regional soil metrics for localized accuracy.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Falling Leaves Background for the entire page (White Section) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.08 }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ 
              position: 'absolute', 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 95}%`,
              width: `${150 + Math.random() * 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}>
              <Lottie 
                animationData={leavesAnimation} 
                loop={true} 
                initialSegment={[Math.random() * 60, 120]}
              />
            </div>
          ))}
        </div>

        {/* --- MODERN DARK HEADER --- */}
        <header style={{ 
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', 
          padding: '120px 0 80px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container position-relative z-index-2"
            >
                <h1 className="display-3 font-weight-bold mb-3 text-white">Soil Nutrient & Weather Guide</h1>
                <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.4rem', lineHeight: '1.6', color: 'white' }}>
                    Get the exact <b style={{ color: 'white' }}>NPK (Nitrogen, Phosphorus, Potassium)</b> balance your crop needs and track real-time <b style={{ color: 'white' }}>weather forecasts</b> to plan your farming schedule with precision.
                </p>
            </motion.div>
            
            {/* Decorative background icons */}
            <div style={{ position: 'absolute', top: '10%', right: '-5%', opacity: 0.05, transform: 'rotate(-20deg)' }}>
                <Leaf size={400} color="#ffffff" />
            </div>
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', opacity: 0.05, transform: 'rotate(15deg)' }}>
                <Leaf size={300} color="#ffffff" />
            </div>
        </header>

        <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <motion.div 
                      className="glass-card p-5 shadow-lg border-0" 
                      style={{ borderRadius: '30px', background: 'white' }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="d-flex align-items-center mb-5">
                            <div className="bg-success text-white p-4 rounded-circle me-4 shadow-success-sm">
                                <Leaf size={32} />
                            </div>
                            <div>
                                <h3 className="display-6 font-weight-bold mb-0" style={{ color: '#064e3b' }}>Analyze Your Farm</h3>
                                <p className="text-muted mb-0 lead">Select your crop and location to generate custom recommendations.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="row g-5">
                            <div className="col-md-12">
                                <label className="form-label font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '1px' }}>Crop Type</label>
                                <select className="form-select py-4 rounded-4 shadow-sm border-0 bg-light px-4" name="crop" onChange={handleChange} required value={formData.crop} style={{ fontSize: '1.25rem' }}>
                                    <option value="">Select Crop</option>
                                    {cropList.map((c) => (
                                        <option key={c} value={c.toLowerCase()}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '1px' }}>State</label>
                                <select className="form-select py-4 rounded-4 shadow-sm border-0 bg-light px-4" name="state" onChange={handleStateChange} required value={formData.state} style={{ fontSize: '1.25rem' }}>
                                    <option value="">Select State</option>
                                    {Object.keys(stateCityData).sort().map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label font-weight-bold text-success text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '1px' }}>City</label>
                                <select className="form-select py-4 rounded-4 shadow-sm border-0 bg-light px-4" name="city" onChange={handleChange} required value={formData.city} disabled={!formData.state} style={{ fontSize: '1.25rem' }}>
                                    <option value="">Select City</option>
                                    {availableCities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 mt-5">
                                <button className="btn w-100 py-4 rounded-pill font-weight-bold shadow-lg transition-all" 
                                        type="submit" 
                                        disabled={loading}
                                        style={{ 
                                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', 
                                          color: 'white',
                                          fontSize: '1.4rem',
                                          border: 'none'
                                        }}>
                                    {loading ? 'Analyzing...' : <>Start Analysis <ArrowRight size={26} className="ms-2" /></>}
                                </button>
                            </div>
                        </form>
                        {error && <div className="alert alert-danger mt-3 rounded-4 border-0 shadow-sm">{error}</div>}
                    </motion.div>
                </div>
            </div>

            {/* RESULTS SECTION */}
            {(result || forecast) && (
                <div className="mt-5 pt-4">
                    {/* 1. Nutrient Ratio */}
                    {result && (
                        <motion.div 
                          className="glass-card p-5 mb-5 shadow-sm border-0" 
                          style={{ borderRadius: '30px', background: 'white' }}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="h2 font-weight-bold mb-4 d-flex align-items-center" style={{ color: '#064e3b' }}>
                                <Leaf className="me-3 text-success" /> Recommended Nutrient Balance (NPK)
                            </h3>
                            <p className="text-muted lead font-weight-bold" style={{ fontSize: '1.3rem', lineHeight: '1.7' }}>
                                For optimal growth of <b>{formData.crop}</b> in your region, aim for the following percentages of Nitrogen, Phosphorus, and Potassium in your soil.
                            </p>
                            <div className="row g-4 mt-1 text-center">
                                {[
                                  { label: "Nitrogen (N)", val: result[0] },
                                  { label: "Phosphorus (P)", val: result[1] },
                                  { label: "Potassium (K)", val: result[2] }
                                ].map((n, i) => (
                                  <div className="col-md-4" key={i}>
                                      <div className="p-5 rounded-4 border-0 shadow-sm h-100 transition-all hover-up" style={{ background: '#f0fdf4' }}>
                                          <h4 className="text-uppercase text-muted font-weight-bold mb-4" style={{ fontSize: '1rem', letterSpacing: '2px' }}>{n.label}</h4>
                                          <h2 className="display-3 font-weight-bold mb-0" style={{ color: '#16a34a' }}>{n.val}%</h2>
                                      </div>
                                  </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 2. Weather Forecast */}
                    {forecast && forecast.length > 0 && (
                        <motion.div 
                          className="glass-card p-5 shadow-sm border-0" 
                          style={{ borderRadius: '30px', background: 'white' }}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                            <h3 className="display-6 font-weight-bold mb-3 d-flex align-items-center" style={{ color: '#064e3b' }}>
                                <Wind className="me-3 text-success" /> 5-Day Weather Forecast
                            </h3>
                            <p className="text-muted mb-4 lead font-weight-bold" style={{ fontSize: '1.15rem' }}>
                                Real-time weather expectations for <b>{formData.city}</b> to help you time your fertilization and irrigation perfectly.
                            </p>
                            <div className="d-flex flex-nowrap mt-4 gap-4 py-4 px-2 weather-scroll" style={{ 
                                overflowX: 'auto', 
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#16a34a #f1f5f9'
                            }}>
                                {forecast.map((day, index) => (
                                    <div key={index} className="text-center transition-all hover-up" style={{ flex: '0 0 240px', maxWidth: '240px' }}>
                                        <div className="p-5 rounded-4 w-100 bg-white shadow-sm border-light h-100 d-flex flex-column" style={{ border: '1px solid #f1f5f9', minHeight: '350px' }}>
                                            <h5 className="font-weight-bold mb-3" style={{ color: '#1a2e05', fontSize: '1.3rem' }}>{day.date}</h5>
                                            <div className="mb-4 mx-auto rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '100px', height: '100px', background: '#f0fdf4' }}>
                                                <img 
                                                    src={`http://openweathermap.org/img/wn/${day.icon}@4x.png`} 
                                                    alt="weather icon" 
                                                    style={{ width: '80px' }} 
                                                />
                                            </div>
                                            <p className="display-5 font-weight-bold mb-1" style={{ color: '#064e3b' }}>{Math.round(day.temp)}°C</p>
                                            <p className="text-muted text-capitalize mb-4 font-weight-bold" style={{ fontSize: '1rem' }}>{day.description}</p>
                                            <div className="mt-auto p-3 rounded-pill bg-light" style={{ fontSize: '1rem', fontWeight: 'bold', color: '#15803d' }}>
                                                <Droplets size={14} className="me-1" /> Hum: {day.humidity}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </section>
        <style>{`
          .hover-up:hover { transform: translateY(-10px); }
          .shadow-success-sm { box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2); }
          .uppercase-xs { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; }
          .weather-scroll::-webkit-scrollbar { height: 8px; }
          .weather-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
          .weather-scroll::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 10px; }
          .weather-scroll::-webkit-scrollbar-thumb:hover { background: #15803d; }
        `}</style>
    </div>
  );
};

export default NutrientAnalysis;