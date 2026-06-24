import numpy as np
import pickle
import os
import requests

# --- PART 1: CROP PREDICTION LOGIC ---

# ... (Previous imports and code) ...

def crop_prediction(nitrogen, phosphorous, pottasium, ph, rainfall, city):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, 'models', 'RandomForest.pkl')

    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
    except FileNotFoundError:
        return "Error: Model file 'RandomForest.pkl' not found"

    # --- OPENWEATHERMAP LOGIC ---
    temperature = 25.0 
    humidity = 50.0   
    
    try:
        # REPLACE THIS WITH YOUR OPENWEATHERMAP KEY
        api_key = "80625cc086748c270222da881b25d7b4" 
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            temperature = data['main']['temp']
            humidity = data['main']['humidity']
    except Exception as e:
        print(f"Weather fetch failed: {e}")

    # ... (Rest of the function remains the same) ...
    input_data = np.array([[nitrogen, phosphorous, pottasium, temperature, humidity, ph, rainfall]])
    prediction = model.predict(input_data)
    return prediction[0]



# (Part 2: Disease Detection Model moved to disease.py to prevent startup overhead)