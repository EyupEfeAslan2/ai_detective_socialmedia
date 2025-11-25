import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

function AccountForm() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeAccount = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    // Simülasyon için 2 saniye bekleme
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Rastgele sonuç üret
    const isFake = Math.random() > 0.5;
    const confidence = Math.floor(Math.random() * 30) + 70;
    
    setResult({
      isFake,
      confidence,
      reasons: isFake 
        ? ['Düşük takipçi etkileşimi', 'Profil fotoğrafı şüpheli', 'Spam benzeri içerik']
        : ['Yüksek etkileşim oranı', 'Tutarlı içerik paylaşımı', 'Doğrulanmış bilgiler']
    });
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Başlık Bölümü - Jantili */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
          <Search className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
          AI Detective
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          <p className="text-slate-300 text-xl font-light">
            Sosyal Medya Sahte Hesap Tespit Sistemi
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
        </div>
        <p className="text-slate-400 text-sm">
          Yapay zeka destekli analiz ile sahte hesapları tespit edin
        </p>
      </div>

      {/* Form Alanı - Geniş */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-semibold mb-3">
            Kullanıcı Adı veya Profil Linki
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeAccount()}
              placeholder="@kullanici_adi veya profil linki girin"
              className="w-full bg-slate-900/80 text-white px-5 py-4 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none transition-all text-lg placeholder-slate-500"
              disabled={loading}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
        </div>

        <button
          onClick={analyzeAccount}
          disabled={loading || !username.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 disabled:cursor-not-allowed text-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              Analiz Ediliyor...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Hesabı Analiz Et
            </div>
          )}
        </button>

        {/* Sonuç Alanı */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-2 ${
            result.isFake 
              ? 'bg-red-500/10 border-red-500/50' 
              : 'bg-green-500/10 border-green-500/50'
          }`}>
            <div className="flex items-start gap-4">
              {result.isFake ? (
                <XCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  result.isFake ? 'text-red-400' : 'text-green-400'
                }`}>
                  {result.isFake ? '⚠️ Sahte Hesap Olabilir' : '✓ Gerçek Hesap Görünüyor'}
                </h3>
                <p className="text-slate-300 mb-4">
                  Güven Skoru: <span className="font-bold text-white">{result.confidence}%</span>
                </p>
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-semibold mb-2">Tespit Nedenleri:</p>
                  {result.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alt Bilgi */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>🔒 Tüm analizler güvenli şekilde yapılır ve saklanmaz</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <AccountForm />
    </div>
  );
}

export default App;