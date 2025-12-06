import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

print("🚀 AI Detective Model Eğitimi (V3 - Final) Başlıyor...")

# 1. DOSYA YOLUNU BUL
current_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(current_dir, '../datasets/twitter_data.csv')

if not os.path.exists(dataset_path):
    print("❌ HATA: CSV dosyası bulunamadı!")
    exit()

# 2. VERİYİ OKU VE TEMİZLE
print("📊 Veri okunuyor...")
df = pd.read_csv(dataset_path)

# --- KRİTİK TEMİZLİK ADIMI ---
# Sütun isimlerindeki gereksiz boşlukları sil ve hepsini küçük harf yap
# Böylece ' follower count ' -> 'follower count' olur.
df.columns = df.columns.str.strip().str.lower()

print("✅ Sütunlar temizlendi:", df.columns.tolist())

# Verisetindeki sütunları eşleştirelim
target_data = pd.DataFrame()

# Özellik 1: Takipçi Sayısı
# Önceki hatayı önlemek için kontrol ediyoruz
if 'follower count' in df.columns:
    target_data['followers'] = df['follower count']
elif 'followers count' in df.columns: # Belki adı böyledir
    target_data['followers'] = df['followers count']
else:
    print("❌ HATA: Takipçi sütunu bulunamadı!")
    exit()

# Özellik 2: Onaylı Hesap mı? (Verified)
# True/False değerlerini 1 ve 0'a çeviriyoruz
target_data['verified'] = df['verified'].astype(int)

# Özellik 3: Retweet Sayısı
target_data['retweet_count'] = df['retweet count']

# Özellik 4: Mention Sayısı
target_data['mention_count'] = df['mention count']

# HEDEF: Bot mu İnsan mı? (bot label)
target_data['is_fake'] = df['bot label'].astype(int)

print(f"✅ {len(target_data)} satır veri başarıyla işlendi.")
print(f"Kullanılan Özellikler: followers, verified, retweet_count, mention_count")

# 3. MODEL EĞİTİMİ
print("🧠 Model eğitiliyor...")

X = target_data.drop('is_fake', axis=1) # Girdiler
y = target_data['is_fake']              # Çıktı

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. SONUÇLARI GÖR
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"🎉 Model Başarısı: %{acc * 100:.2f}")

# 5. KAYDET
save_path = os.path.join(current_dir, '../models/social_media_fraud_model.pkl')
os.makedirs(os.path.dirname(save_path), exist_ok=True)
joblib.dump(model, save_path)

print(f"💾 Model kaydedildi: {save_path}")
print("👉 Lütfen oluşan .pkl dosyasını 'backend/' klasörüne kopyala!")