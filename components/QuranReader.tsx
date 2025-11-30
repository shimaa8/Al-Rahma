import React, { useState, useEffect, useRef } from 'react';
import { Surah, Ayah } from '../types';
import { fetchSurahList, fetchSurahText, RECITERS, getAudioUrl } from '../services/quranService';
import { Play, Pause, ChevronLeft, ChevronRight, Type, Loader2 } from 'lucide-react';

const QuranReader: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadSurahs = async () => {
      const list = await fetchSurahList();
      setSurahs(list);
      if (list.length > 0) handleSurahChange(list[0]);
    };
    loadSurahs();
  }, []);

  const handleSurahChange = async (surah: Surah) => {
    setLoading(true);
    setIsPlaying(false);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setCurrentSurah(surah);
    const text = await fetchSurahText(surah.number);
    setAyahs(text);
    setLoading(false);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSurah) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSurah = (direction: 'next' | 'prev') => {
    if (!currentSurah) return;
    const currentIndex = surahs.findIndex(s => s.number === currentSurah.number);
    if (direction === 'next' && currentIndex < surahs.length - 1) {
      handleSurahChange(surahs[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      handleSurahChange(surahs[currentIndex - 1]);
    }
  };

  return (
    <div className="pb-32 md:pb-20 pt-4 px-4 max-w-4xl mx-auto h-full flex flex-col">
      {/* Controls Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm p-4 mb-4 sticky top-4 z-30 border border-stone-100 dark:border-stone-800 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
             <div className="flex items-center gap-2">
                <button onClick={() => changeSurah('next')} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300">
                    <ChevronRight size={20} />
                </button>
                <select 
                    value={currentSurah?.number} 
                    onChange={(e) => {
                        const s = surahs.find(sur => sur.number === parseInt(e.target.value));
                        if(s) handleSurahChange(s);
                    }}
                    className="appearance-none bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-2 text-stone-800 dark:text-stone-200 font-bold font-['Cairo'] text-center min-w-[140px] outline-none"
                >
                    {surahs.map(s => (
                        <option key={s.number} value={s.number}>
                            {s.number}. {s.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => changeSurah('prev')} className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300">
                    <ChevronLeft size={20} />
                </button>
             </div>
             
             <div className="relative group">
                <button className="p-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                    <Type size={20} />
                </button>
                <div className="absolute left-0 mt-2 bg-white dark:bg-stone-900 shadow-xl rounded-lg p-3 hidden group-hover:block min-w-[150px] border border-stone-100 dark:border-stone-700 z-50">
                    <label className="text-xs text-stone-500 dark:text-stone-400 mb-2 block">حجم الخط</label>
                    <input 
                        type="range" 
                        min="18" 
                        max="48" 
                        value={fontSize} 
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full accent-emerald-600"
                    />
                </div>
             </div>
          </div>

          {/* Audio Controls */}
          <div className="flex justify-between items-center bg-stone-50 dark:bg-stone-800 p-3 rounded-xl transition-colors">
             <select 
                value={selectedReciter} 
                onChange={(e) => {
                    setIsPlaying(false);
                    setSelectedReciter(e.target.value);
                }}
                className="bg-transparent text-sm font-semibold text-stone-700 dark:text-stone-300 outline-none w-full"
             >
                {RECITERS.map(r => (
                    <option key={r.id} value={r.id} className="text-stone-900 bg-white">{r.name}</option>
                ))}
             </select>
             <button 
                onClick={togglePlay}
                className={`ml-2 p-3 rounded-full text-white shadow-md transition-all ${isPlaying ? 'bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-700'}`}
             >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" ml-1 />}
             </button>
          </div>
        </div>
        
        {currentSurah && (
            <audio 
                ref={audioRef}
                src={getAudioUrl(selectedReciter, currentSurah.number)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                    setIsPlaying(false);
                    alert("عذراً، التلاوة غير متاحة حالياً لهذه السورة مع هذا القارئ.");
                }}
            />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-stone-900 rounded-2xl shadow-sm p-6 border border-stone-100 dark:border-stone-800 min-h-[50vh] transition-colors">
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-emerald-600 dark:text-emerald-500" size={40} />
            </div>
        ) : (
            <div className="quran-container">
                <div className="text-center mb-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Basmala.svg" alt="Bismillah" className="h-12 mx-auto opacity-80 dark:opacity-70 dark:invert" />
                </div>
                
                <div 
                    className="quran-text text-justify text-stone-800 dark:text-stone-200" 
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {ayahs.map((ayah, idx) => (
                        <span key={ayah.number} className="inline leading-relaxed">
                            {ayah.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '')} 
                            <span className="text-emerald-600 dark:text-emerald-400 text-[0.7em] mx-2 font-sans border border-emerald-200 dark:border-emerald-800 rounded-full w-8 h-8 inline-flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 relative -top-1">
                                {ayah.numberInSurah}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuranReader;