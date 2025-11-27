import { useState } from 'react';

function AccountForm() {
  // --- MANTIK KISMI (AYNEN KORUNDU) ---
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.includes(' ')) {
      setError('⚠️ Kullanıcı adında boşluk olamaz!');
      setUsername(value.replace(/\s/g, ''));
    } else {
      setError('');
      setUsername(value);
    }
  };

  const analyzeAccount = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Lütfen bir kullanıcı adı girin.');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null); // Yeni analizde eski sonucu temizle
    
    // Simülasyon
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isFake = Math.random() > 0.5;
    setResult({
      isFake,
      confidence: Math.floor(Math.random() * 30) + 70,
      platform,
      username,
      reasons: isFake 
        ? ['Düşük takipçi etkileşimi', 'Profil fotoğrafı şüpheli', 'Spam benzeri içerik']
        : ['Yüksek etkileşim oranı', 'Tutarlı içerik paylaşımı', 'Doğrulanmış bilgiler']
    });
    setLoading(false);
  };

  const platformEmojis = {
    twitter: '🐦',
    instagram: '📸',
    facebook: '👥',
    tiktok: '🎵'
  };

  // --- TASARIM KISMI (YENİLENDİ) ---
  return (
    <div className="w-full max-w-lg relative z-10">
      
      {/* 1. Başlık ve Logo Alanı */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 mb-4 animate-bounce-slow">
          <span className="text-3xl">🕵️‍♂️</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          AI Detective
        </h1>
        <p className="text-slate-400 font-medium">
          Sosyal Medya Profil Analizi
        </p>
      </div>

      {/* 2. Ana Kart (Glassmorphism) */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <form onSubmit={analyzeAccount} className="space-y-6">
          
          {/* Platform Seçimi */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Platform</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-2xl group-focus-within:scale-110 transition-transform duration-200">
                  {platformEmojis[platform]}
                </span>
              </div>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950/50 border border-slate-700 text-white text-lg rounded-xl block pl-14 pr-10 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer hover:bg-slate-950/70"
              >
                <option value="twitter">Twitter (X)</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Kullanıcı Adı */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Kullanıcı Adı</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-slate-400 text-xl font-bold">@</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="kullaniciadi"
                disabled={loading}
                className="w-full bg-slate-950/50 border border-slate-700 text-white text-lg rounded-xl block pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 hover:bg-slate-950/70"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}
          </div>

          {/* Analiz Butonu */}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full relative group overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl opacity-100 transition-opacity animate-gradient-xy"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-[10px] py-4 px-6 transition-all duration-200 font-bold text-lg flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  <span>Sistem Taranıyor...</span>
                </>
              ) : (
                <>
                  <span>Analizi Başlat</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </>
              )}
            </div>
          </button>
        </form>
      </div>

      {/* 3. Sonuç Kartı (Animasyonlu) */}
      {result && (
        <div className="mt-6 animate-fade-in-up">
          <div className={`rounded-3xl p-6 border ${
            result.isFake 
              ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
              : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                result.isFake ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {result.isFake ? '⚠️' : '🛡️'}
              </div>
              <div>
                <h3 className={`text-xl font-bold ${result.isFake ? 'text-red-400' : 'text-emerald-400'}`}>
                  {result.isFake ? 'Şüpheli Hesap' : 'Güvenilir Hesap'}
                </h3>
                <p className="text-slate-400 text-sm">Güven Skoru: %{result.confidence}</p>
              </div>
            </div>
            
            <div className="space-y-2 pl-2 border-l-2 border-slate-700/50">
              {result.reasons.map((reason, i) => (
                <div key={i} className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-slate-500 text-xs font-medium uppercase tracking-widest opacity-60">
        YM221 - Güvenli Analiz Sistemi
      </p>
    </div>
  );
}

// --- ANA APP BİLEŞENİ ---
function App() {
  return (
    // Arka plan gradient ve grid deseni
    <div className="min-h-screen w-full bg-[#0B1120] relative flex items-center justify-center p-4 overflow-hidden">
      
      {/* Arka plan efektleri (Blur blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <AccountForm />
    </div>
  );
}

export default App;