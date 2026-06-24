import os
import pickle
import requests
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- IMPORT YOUR CUSTOM MODULES ---
# Ensure these .py files are in the same folder as app.py
import model as crop_model_script
import fertilizer as fertilizer_script
# disease is imported lazily inside the route handler to avoid server startup overhead
from NPKEstimatorModule import NPKEstimator

app = Flask(__name__)
CORS(app)  # This allows React to talk to this Flask app

# --- CONFIGURATION ---
# Upload folder is dynamically handled using tempfile.gettempdir() in routes to support read-only filesystems

# --- API ROUTES ---

@app.route('/', methods=['GET'])
def home():
    return "CropCare AI Backend is Running!"

# 1. CROP PREDICTION
@app.route('/api/predict_crop', methods=['POST'])
def predict_crop():
    try:
        data = request.get_json()
        
        # Extract inputs
        nitrogen = int(data.get('nitrogen'))
        phosphorous = int(data.get('phosphorous'))
        pottasium = int(data.get('pottasium'))
        ph = float(data.get('ph'))
        rainfall = float(data.get('rainfall'))
        city = data.get('city')
        
        # Call the function from model.py
        # NOTE: Ensure crop_prediction returns a string (e.g., 'Rice'), not a template
        prediction = crop_model_script.crop_prediction(nitrogen, phosphorous, pottasium, ph, rainfall, city)
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        print(f"Error in Crop Prediction: {e}")
        return jsonify({'error': str(e)}), 500

# 2. FERTILIZER RECOMMENDATION
@app.route('/api/recommend_fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        data = request.get_json()
        
        cropname = data.get('cropname')
        nitrogen = int(data.get('nitrogen'))
        phosphorous = int(data.get('phosphorous'))
        pottasium = int(data.get('pottasium'))

        # Call function from fertilizer.py
        recommendation = fertilizer_script.fertilizer_recommendation(cropname, nitrogen, phosphorous, pottasium)
        
        return jsonify({'recommendation': recommendation})
    except Exception as e:
        print(f"Error in Fertilizer Recommendation: {e}")
        return jsonify({'error': str(e)}), 500

# 3. DISEASE PREDICTION
@app.route('/api/predict_disease', methods=['POST'])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file:
        try:
            import tempfile
            # Use system temp directory for uploads (guaranteed writable on all host environments)
            upload_dir = os.path.join(tempfile.gettempdir(), 'agrinex_uploads')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir, exist_ok=True)
                
            filepath = os.path.join(upload_dir, file.filename)
            file.save(filepath)
            
            # Lazy import to avoid loading heavy torch/torchvision models at server startup
            import disease as disease_script
            prediction = disease_script.disease_prediction(filepath)
            
            # Remove file after prediction to save space
            if os.path.exists(filepath):
                os.remove(filepath)
                
            return jsonify({'prediction': prediction})
        except Exception as e:
            print(f"Error in Disease Prediction: {e}")
            return jsonify({'error': str(e)}), 500

# --- 4. NUTRIENT ANALYSIS + WEATHER FORECAST ---
# --- 4. NUTRIENT ANALYSIS + WEATHER FORECAST (With Fallback) ---
@app.route('/api/nutrient_analysis', methods=['POST'])
def nutrient_analysis():
    try:
        data = request.get_json()
        crop_input = data.get('crop', '').strip().lower()
        city = data.get('city', '')

        # --- A. Get Nutrient Data from CSV ---
        base_dir = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(base_dir, 'data', 'fertilizer.csv')

        if not os.path.exists(csv_path):
             return jsonify({'error': 'Database file fertilizer.csv not found'}), 500

        df = pd.read_csv(csv_path)
        df.columns = df.columns.str.strip()
        crop_row = df[df['Crop'].str.strip().str.lower() == crop_input]
        
        if crop_row.empty:
            return jsonify({'error': f"Crop '{crop_input}' not found."}), 404

        n = int(crop_row.iloc[0]['N'])
        p = int(crop_row.iloc[0]['P'])
        k = int(crop_row.iloc[0]['K'])
        
        # --- B. Get Weather Forecast (OpenWeatherMap) ---
        forecast_data = []
        
        try:
            # 1. REPLACE THIS WITH YOUR REAL KEY
            # If you don't have one, the "fallback" block below will run.
            api_key = "80625cc086748c270222da881b25d7b4" 
            
            url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
            
            print(f"🌍 Fetching Weather for: {city}...")
            response = requests.get(url)
            
            if response.status_code == 200:
                raw_data = response.json()
                seen_dates = set()
                
                for item in raw_data['list']:
                    dt_txt = item['dt_txt']
                    date_part = dt_txt.split(' ')[0]
                    time_part = dt_txt.split(' ')[1]
                    
                    if date_part not in seen_dates:
                        if "12:00" in time_part or "15:00" in time_part: 
                            forecast_data.append({
                                'date': date_part,
                                'temp': item['main']['temp'],
                                'humidity': item['main']['humidity'],
                                'description': item['weather'][0]['description'],
                                'icon': item['weather'][0]['icon']
                            })
                            seen_dates.add(date_part)
                            if len(forecast_data) >= 5: break
                print("✅ Weather fetched successfully!")
                
            else:
                print(f"❌ Weather API Error: Status {response.status_code}")
                print(f"   Reason: {response.text}")
                # Raise error to trigger fallback
                raise Exception("API Request Failed")

        except Exception as e:
            print(f"⚠️ Weather Fetch Failed: {e}")
            print("💡 Using DUMMY weather data so UI shows up.")
            
            # --- FALLBACK: DUMMY DATA (So you can see the UI) ---
            forecast_data = [
                {'date': '2026-02-04', 'temp': 28, 'humidity': 50, 'description': 'sunny', 'icon': '01d'},
                {'date': '2026-02-05', 'temp': 27, 'humidity': 55, 'description': 'cloudy', 'icon': '03d'},
                {'date': '2026-02-06', 'temp': 26, 'humidity': 60, 'description': 'rain', 'icon': '10d'},
                {'date': '2026-02-07', 'temp': 29, 'humidity': 45, 'description': 'clear', 'icon': '01d'},
                {'date': '2026-02-08', 'temp': 30, 'humidity': 40, 'description': 'sunny', 'icon': '01d'}
            ]

        # --- C. Return Both ---
        return jsonify({
            'result': [n, p, k],
            'forecast': forecast_data
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

  
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_DEBUG", "True").lower() in ("true", "1", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)