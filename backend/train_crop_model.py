# backend/train_crop_model.py
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle
import os

# --- CONFIGURATION ---
# We look for common filenames. If yours is different, add it here.
possible_files = [
    'data/crop_recommendation.csv', 
    'data/cpdata.csv', 
    'crop_recommendation.csv',
]

csv_path = None
for f in possible_files:
    if os.path.exists(f):
        csv_path = f
        break

if not csv_path:
    print("❌ ERROR: Could not find crop data CSV file.")
    print(f"   Please make sure one of these exists in your backend folder: {possible_files}")
    exit()

print(f"✅ Found data file: {csv_path}")

# --- 1. LOAD DATA ---
try:
    df = pd.read_csv(csv_path)
    
    # Clean up column names (strip spaces, lowercase) just in case
    df.columns = df.columns.str.strip()
    
    # Identify Features and Target
    # We expect: N, P, K, temperature, humidity, ph, rainfall -> label
    # Adjust this if your CSV has different names
    required_features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    
    # Check if columns exist
    missing_cols = [c for c in required_features if c not in df.columns]
    if missing_cols:
        print(f"❌ ERROR: Your CSV is missing these columns: {missing_cols}")
        print(f"   Available columns: {list(df.columns)}")
        exit()

    X = df[required_features]
    y = df['label'] # Or 'crop' if your column is named that

    # --- 2. TRAIN MODEL ---
    print("⏳ Training Random Forest Model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    RF = RandomForestClassifier(n_estimators=20, random_state=0)
    RF.fit(X_train, y_train)

    # --- 3. TEST & SAVE ---
    y_pred = RF.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"🚀 Model Trained Successfully! Accuracy: {accuracy * 100:.2f}%")

    # Ensure models directory exists
    if not os.path.exists('models'):
        os.makedirs('models')

    save_path = 'models/RandomForest.pkl'
    with open(save_path, 'wb') as f:
        pickle.dump(RF, f)
    
    print(f"💾 New model saved to: {save_path}")
    print("👉 You can now run 'python app.py' without errors.")

except Exception as e:
    print(f"❌ An error occurred: {e}")