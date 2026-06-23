# 🌿 AgriNex - Sustainable Crop Management System

**AgriNex** is a comprehensive AI-powered agricultural platform designed to optimize crop yields and soil health. It combines a high-performance Flask backend with a premium, animated React frontend to provide actionable insights for farmers and agronomists.

---

## 🌟 Project Overview

AgriNex provides a suite of tools for modern agriculture:
1. **Crop Prediction**: AI-driven crop selection based on soil nutrients and weather.
2. **Fertilizer Recommendation**: Tailored nutrient management advice.
3. **Plant Disease Detection**: Image-based diagnosis using Deep Learning (ResNet9).
4. **Weather Forecasting**: Integrated 5-day forecasts for precise planning.

---

## 🏗️ Architecture

- **Frontend**: React 19, Vite, Framer Motion, Lottie, Bootstrap 5.
- **Backend**: Flask (Python), PyTorch, Pandas, Scikit-learn.
- **Models**: Pre-trained Random Forest for crops and ResNet9 for diseases.

---

## 🚀 Getting Started

To run the full system, you need to start both the backend and frontend.

### 1. Backend Setup (Flask)
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pip install flask flask-cors requests pandas torch torchvision pillow scikit-learn

# Start the server
python app.py
```
*Backend will run on `http://127.0.0.1:5000`*

### 2. Frontend Setup (React)
```bash
# Navigate to the Frontend directory
cd Frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```
*Frontend will run on `http://localhost:5173`*

---

## 📂 Repository Structure

```text
Sustainable-Crop-Management-System/
├── backend/            # Flask API & AI Models
│   ├── data/           # CSV datasets
│   ├── models/         # Trained .pkl and .pth files
│   └── app.py          # Main API entry
└── Frontend/           # React Application
    ├── src/            # Components & Pages
    └── package.json    # Frontend dependencies
```

---

## 🎨 Visual Experience
The project features a **Premium Animated UI** with:
- **Liquid Backgrounds**: Smooth Lottie animations.
- **Reveal Effects**: Framer Motion entrance animations for every section.
- **Micro-interactions**: Responsive hover states and tactile feedback.

---

Developed for **Sustainable Agriculture & AI Innovation**.
