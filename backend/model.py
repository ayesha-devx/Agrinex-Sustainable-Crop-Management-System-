import torch
import torch.nn as nn
import numpy as np
import pandas as pd
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



# --- PART 2: DISEASE DETECTION MODEL (Keep existing) ---
# (Paste your ResNet9 class code here if it's missing, otherwise keep what you have)
def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)

class ResNet9(nn.Module):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True)
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        self.conv3 = ConvBlock(128, 256, pool=True)
        self.conv4 = ConvBlock(256, 512, pool=True)
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        self.classifier = nn.Sequential(nn.MaxPool2d(4), nn.Flatten(), nn.Linear(512, num_diseases))
    
    def forward(self, x):
        out = self.conv1(x)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out