#AI detective web sitesi dosya yapıları.Githuba yüklenecek.
cat > README.md <<EOF
# 🕵️‍♂️ AI Detective: Sahte Sosyal Medya Hesabı Tespit Yazılımı

**Ders:** YMH221 - Nesne Tabanlı Programlama  
**Dönem:** 2025-2026 Güz  

## 🚀 Proje Hakkında
Bu proje, sosyal medya platformlarındaki (X, Instagram vb.) kullanıcı hesaplarını analiz ederek, hesabın **gerçek bir kişiye mi** yoksa bir **bota/fake hesaba mı** ait olduğunu tespit eden yapay zeka destekli bir yazılımdır.

Amaç: Manipülasyon ve dolandırıcılık amacıyla oluşturulan sahte hesapları davranışsal analiz ve veri madenciliği yöntemleriyle belirlemektir.

## 📂 Proje Mimarisi
Proje, "Separation of Concerns" (İlgi Alanlarının Ayrımı) prensibine göre 3 ana modüle ayrılmıştır:

1.  **🤖 ai_core/** (Yapay Zeka Ekibi- Kerim,Emre,Mete)
    * Veri setlerinin işlendiği, makine öğrenmesi modellerinin (Random Forest, Neural Networks vb.) eğitildiği alandır.
    * Çıktı: Eğitilmiş `.pkl` veya `.h5` model dosyaları.

2.  **⚙️ backend/** (Sunucu & API-Herkes)
    * Python (Flask/FastAPI) tabanlı sunucu.
    * Frontend'den gelen kullanıcı adını alır, AI modeline sorar ve sonucu geri döndürür.

3.  **💻 frontend/** (Kullanıcı Arayüzü-Eyüp-Mesut)
    * Son kullanıcının şüpheli profili girdiği web arayüzü.
    * HTML, CSS, JavaScript teknolojileri.

## 🛠️ Kurulum ve Çalıştırma
*(Proje geliştirme aşamasındadır. Detaylar eklenecektir.)*

EOF