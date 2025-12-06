#AI detective web sitesi dosya yapıları.Githuba yüklenecek.
cat > README.md <<EOF
### AI Detective: Sahte Sosyal Medya Hesabı Tespit Yazılımı
Kaggle'dan alınan veriseti:
https://www.kaggle.com/datasets/goyaladi/twitter-bot-detection-dataset
## Proje Hakkında
Bu proje, sosyal medya platformlarındaki (X, Instagram vb.) kullanıcı hesaplarını analiz ederek, hesabın **gerçek bir kişiye mi** yoksa bir **bota/fake hesaba mı** ait olduğunu tespit eden yapay zeka destekli bir yazılımdır.

Amaç: Manipülasyon ve dolandırıcılık amacıyla oluşturulan sahte hesapları davranışsal analiz ve veri madenciliği yöntemleriyle belirlemektir.

## Proje Mimarisi
Proje, 3 ana modüle ayrılmıştır:

1.  **ai_core/** (
    * Veri setlerinin işlendiği, makine öğrenmesi modellerinin (Random Forest, Neural Networks vb.) eğitildiği alandır.
    * Çıktı: Eğitilmiş `.pkl` veya `.h5` model dosyaları.

2.  **backend/** (Sunucu & API-Herkes)
    * Python (Flask/FastAPI) tabanlı sunucu.
    * Frontend'den gelen kullanıcı adını alır, AI modeline sorar ve sonucu geri döndürür.

3.  **frontend/** 
    * Son kullanıcının şüpheli profili girdiği web arayüzü.
    * HTML, CSS, JavaScript teknolojileri.

##  Kurulum ve Çalıştırma
GitHub dosya boyutu sınırları nedeniyle eğitilmiş model (.pkl) repoda yoktur. Projeyi ilk kez çalıştırırken python ai_core/scripts/train_model.py komutunu çalıştırarak modeli kendi bilgisayarınızda oluşturunuz.

EOF
