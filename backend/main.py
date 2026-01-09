from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import gc
import joblib
import pandas as pd
import numpy as np
import os

model_path = "social_media_fraud_model.pkl"
model = None
if os.path.exists(model_path):
    model = joblib.load(model_path)
    print("✅ Model Yüklendi ve Hazır!")
    # RAM TEMİZLİĞİ: Model yüklendikten sonra boşa çıkan geçici hafızayı temizle
    gc.collect() 
else:
    print("❌ Model Yok!")
    
app = FastAPI()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"] diyerek tüm sitelere izin veriyoruz (En garanti yöntem)
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL YÜKLEME ---
model_path = "social_media_fraud_model.pkl"
model = None
try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print(f"✅ Model Yüklendi: {model_path}")
    else:
        print("⚠️ Model bulunamadı!")
except Exception as e:
    print(f"❌ Model Hatası: {e}")

class AnalyzeRequest(BaseModel):
    username: str
    platform: str

@app.post("/analyze")
async def analyze_account(request: AnalyzeRequest):
    print(f"\n📨 --- YENİ İSTEK: {request.username} ---")

    if not model:
        return {"isFake": True, "confidence": 0, "reasons": ["Model Yok"]}

    try:
        # SİMÜLASYON AYARLARI (Modelin farkı anlaması için uç değerler veriyoruz)
        
        # KURAL: Kullanıcı adında 'bot', 'fake' veya 'test' varsa BOT verisi üret
        is_simulated_bot = any(keyword in request.username.lower() for keyword in ["bot", "fake", "test"])

        if is_simulated_bot:
            print("🤖 Simülasyon: BOT profili verisi hazırlanıyor...")
            features = {
                'followers': 5,           # Çok az takipçi
                'verified': 0,            # Onaysız
                'retweet_count': 10000,   # Aşırı Retweet (Spam sinyali)
                'mention_count': 0        # Kimseyle konuşmuyor
            }
        else:
            print("bust👤 Simülasyon: İNSAN profili verisi hazırlanıyor...")
            features = {
                'followers': 500,       # Bayağı takipçi (Güven versin)
                'verified': 1,            # Onaylı hesap
                'retweet_count': 5,       # Az retweet
                'mention_count': 200      # Çok etkileşim/sohbet
            }

        # DataFrame oluştur (Sütun sırası modele girenle AYNI olmalı)
        # Sütunlar: ['followers', 'verified', 'retweet_count', 'mention_count']
        input_df = pd.DataFrame([features], columns=['followers', 'verified', 'retweet_count', 'mention_count'])
        
        # TERMİNALE BAS (Gözümüzle görelim ne giriyor)
        print(f"🔍 Modele Giren Veri:\n{input_df.to_string(index=False)}")

        # Tahmin
        prediction = model.predict(input_df)[0]
        proba = model.predict_proba(input_df)[0]
        
        # Bot olma ihtimali (Sınıf 1)
        fake_probability = proba[1] 
        
        is_fake = bool(prediction == 1)
        confidence = int(fake_probability * 100) if is_fake else int(proba[0] * 100)

        print(f"🎯 Sonuç: {'FAKE' if is_fake else 'REAL'} (Güven: %{confidence})")

        # Sebepler
        if is_fake:
            reasons = ["Profil etkileşimleri yapay duruyor", "Takipçi/Aktivite oranı dengesiz", "Yüksek spam riski"]
        else:
            reasons = ["Hesap doğrulanmış ve güvenilir", "Organik etkileşim akışı", "Güçlü takipçi kitlesi"]

        return {
            "username": request.username,
            "platform": request.platform,
            "isFake": is_fake,
            "confidence": confidence,
            "reasons": reasons
        }

    except Exception as e:
        print(f"🔥 HATA: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))