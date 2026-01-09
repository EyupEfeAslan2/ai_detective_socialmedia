import { useState } from 'react';

// --- MANTIK KISMI ---
function AccountForm() {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.includes(' ')) {
      setError('⚠️ Boşluk kullanılamaz');
      setUsername(value.replace(/\s/g, ''));
    } else {
      setError('');
      setUsername(value);
    }
  };

const analyzeAccount = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(''); // Hata varsa temizle

    try {
      // 1. Backend'e İstek Gönder (Fetch API)
      const response = await fetch('https://ai-detective-backend.onrender.com/analyze', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Gönderdiğimiz veri:
        body: JSON.stringify({ 
          username: username, 
          platform: platform 
        }),
      });

      // 2. Backend'den cevap başarılı mı kontrol et
      if (!response.ok) {
        throw new Error('Sunucu hatası oluştu!');
      }

      // 3. Gelen cevabı oku
      const data = await response.json();

      // 4. Sonucu ekrana bas
      setResult({
        isFake: data.isFake,
        confidence: data.confidence,
        platform: data.platform,
        username: data.username,
        reasons: data.reasons
      });

    } catch (err) {
      console.error("Bağlantı hatası:", err);
      setError('Sunucuyla bağlantı kurulamadı! Backend çalışıyor mu?');
    } finally {
      setLoading(false);
    }
  };

  // İkonlar (SVG Kodları) - Daha temiz ve optimize
  const icons = {
    twitter: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    facebook: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    tiktok: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  };

  // Platform isimleri
  const platformNames = {
    twitter: 'Twitter (X)',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok'
  };

  return (
    <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      
      {/* Üst Renkli Çizgi - Daha canlı */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Başlık - Dedektif emojisi kaldırıldı, sadece yazı */}
      <div className="text-center mb-10 mt-2">
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Detective
        </h1>
        <p className="text-slate-400 text-lg font-medium">Gelişmiş Sosyal Medya Profil Analizi</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <span className="text-xs text-slate-500 uppercase tracking-widest">Yapay Zeka Destekli</span>
          <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
      </div>

      <form onSubmit={analyzeAccount} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PLATFORM SEÇİMİ - İyileştirilmiş */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
              Platform
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors z-10">
                {icons[platform]}
              </div>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950 text-white p-4 pl-14 pr-10 rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none cursor-pointer transition-all hover:bg-slate-900 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Object.entries(platformNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-sm transition-transform group-hover:translate-y-[-40%]">
                ▼
              </div>
            </div>
          </div>

          {/* KULLANICI ADI - İyileştirilmiş */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
              Kullanıcı Adı
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-purple-400 transition-colors text-lg">@</span>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="kullaniciadi"
                disabled={loading}
                className="w-full bg-slate-950 text-white p-4 pl-12 rounded-xl border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-slate-600 hover:bg-slate-900 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Hata Mesajı - Geliştirilmiş animasyon */}
        {error && (
          <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/30 animate-shake">
            <span className="text-base">⚠️</span> {error}
          </div>
        )}

        {/* Buton - Daha çekici tasarım */}
        <button
          type="submit"
          disabled={loading || !username}
          className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_auto] hover:bg-right transition-all duration-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg group relative overflow-hidden"
        >
          {/* Buton ışıltı efekti */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Hesap Taranıyor...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🔍</span>
              <span>Detaylı Analizi Başlat</span>
            </>
          )}
        </button>
      </form>

      {/* SONUÇ ALANI - Geliştirilmiş görsel */}
      {result && (
        <div className="mt-8 pt-8 border-t border-slate-700/50 animate-fade-in-up">
          <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
            result.isFake 
              ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/10' 
              : 'bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/10'
          }`}>
            
            {/* Üst Kısım: Skor ve Karar */}
            <div className="flex items-start gap-5 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl relative ${
                result.isFake ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-green-500 to-green-600'
              }`}>
                {result.isFake ? '⚠' : '✓'}
                {/* Pulse efekti */}
                <div className={`absolute inset-0 rounded-2xl animate-ping opacity-20 ${
                  result.isFake ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-slate-400">
                    {icons[result.platform]}
                  </div>
                  <span className="text-slate-500 text-sm">@{result.username}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {result.isFake ? 'Yüksek Riskli Hesap' : 'Güvenilir Hesap'}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Güven Skoru</span>
                    <span className={`font-bold font-mono ${result.isFake ? 'text-red-400' : 'text-green-400'}`}>
                      %{result.confidence}
                    </span>
                  </div>
                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.isFake 
                          ? 'bg-gradient-to-r from-red-600 to-red-500' 
                          : 'bg-gradient-to-r from-green-600 to-green-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    >
                      <div className="h-full w-full animate-pulse bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alt Kısım: Detaylar */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-xl p-5 border border-slate-800/50">
              <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Tespit Detayları
              </h4>
              <ul className="space-y-3">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300 text-sm group">
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-all group-hover:scale-125 ${
                      result.isFake ? 'bg-red-400' : 'bg-green-400'
                    }`}></span>
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// --- ANA APP ---
function App() {
  return (
    <div className="w-screen min-h-screen bg-[#0B1120] flex items-center justify-center relative overflow-hidden py-8">
      
      {/* Arka Plan Efektleri - Daha yumuşak */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full px-4 flex justify-center z-10">
        <AccountForm />
      </div>
    </div>
  );
}

export default App;