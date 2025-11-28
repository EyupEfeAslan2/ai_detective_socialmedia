from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

# Uygulamayı başlat
app = FastAPI()

# --- CORS AYARLARI (ÖNEMLİ) ---
# Frontend (localhost:5173) Backend'e (localhost:8000) erişebilsin diye izin veriyoruz.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- VERİ TİPLERİ ---
# Frontend'den bize ne gelecek? Sadece bunları kabul et.
class AnalyzeRequest(BaseModel):
    username: str
    platform: str

# --- API UÇLARI (ENDPOINTS) ---

@app.get("/")
def read_root():
    return {"message": "AI Detective Backend Çalışıyor! 🕵️‍♂️"}

@app.post("/analyze")
async def analyze_account(request: AnalyzeRequest):
    # 1. İsteği aldığımızı görelim
    print(f"Gelen İstek -> Platform: {request.platform}, Kullanıcı: {request.username}")

    # 2. Simülasyon (Yapay zeka düşünüyormuş gibi bekleme)
    time.sleep(2) 

    # 3. BURAYA İLERİDE GERÇEK AI MODELİ GELECEK
    # Şimdilik rastgele sonuç üretelim (Frontend'deki mantığın aynısı)
    is_fake = random.choice([True, False])
    confidence = random.randint(70, 99)

    fake_reasons = [
        "Takipçi/Takip edilen oranı dengesiz", 
        "Profil fotoğrafı stok görsel olabilir", 
        "Son 30 günde anormal aktivite", 
        "Paylaşımlarda spam içerik tespit edildi"
    ]
    
    real_reasons = [
        "Hesap doğrulanmış telefon numarasına sahip", 
        "Etkileşimler organik ve zamana yayılmış", 
        "Gerçek kişilerle karşılıklı takipleşme var", 
        "Profil bilgileri tutarlı"
    ]

    # 4. Sonucu Frontend'e geri gönder
    return {
        "username": request.username,
        "platform": request.platform,
        "isFake": is_fake,
        "confidence": confidence,
        "reasons": fake_reasons if is_fake else real_reasons
    }