import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';// Setting Nutrients as default Home for now
import CropPrediction from './pages/CropPrediction';
import FertilizerRec from './pages/FertilizerRec';
import DiseaseDetect from './pages/DiseaseDetect';
import NutrientAnalysis from './pages/NutrientAnalysis';

// Import CSS
import './assets/css/style.css'; // Make sure you copied your old css here
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/nutrients" element={<NutrientAnalysis />} />
          <Route path="/crop" element={<CropPrediction />} />
          <Route path="/fertilizer" element={<FertilizerRec />} />
          <Route path="/disease" element={<DiseaseDetect />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;