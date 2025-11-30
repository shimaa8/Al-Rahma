import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuranReader from './components/QuranReader';
import Masbaha from './components/Masbaha';
import QiblaCompass from './components/QiblaCompass';
import DuaGenerator from './components/DuaGenerator';
import Dedication from './components/Dedication';
import IstighfarBar from './components/IstighfarBar';
import AutoDua from './components/AutoDua';
import { AppView } from './types';
import { Heart, Moon, Sun, BookOpen, Compass, HeartHandshake, Sparkles, Home, Share2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [fatherName, setFatherName] = useState<string>('');
  const [isSetup, setIsSetup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved name and theme from local storage
  useEffect(() => {
    const savedName = localStorage.getItem('fatherName');
    if (savedName) {
      setFatherName(savedName);
      setIsSetup(true);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const handleStart = () => {
    if (fatherName.trim()) {
      localStorage.setItem('fatherName', fatherName);
      setIsSetup(true);
    } else {
        alert("الرجاء كتابة اسم الوالد للمتابعة");
    }
  };

  const navItems = [
    { view: AppView.HOME, icon: Home, label: 'الرئيسية' },
    { view: AppView.QURAN, icon: BookOpen, label: 'القرآن' },
    { view: AppView.MASBAHA, icon: HeartHandshake, label: 'السبحة' },
    { view: AppView.DUA, icon: Sparkles, label: 'دعاء' },
    { view: AppView.QIBLA, icon: Compass, label: 'القبلة' },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
            <div className="p-6 text-center space-y-8 animate-fade-in pb-32 md:pb-20 max-w-5xl mx-auto">
                <div className="mt-4 md:mt-8 p-6 md:p-10 bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                    <h2 className="text-xl md:text-2xl font-semibold text-emerald-800 dark:text-emerald-400 mb-2 font-['Amiri']">إلى روح الوالد</h2>
                    <h1 className="text-3xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-6 font-['Amiri']">{fatherName}</h1>
                    <div className="h-px w-1/3 bg-stone-200 dark:bg-stone-700 mx-auto my-6"></div>
                    <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        اللهم اجعل هذا العمل صدقة جارية، ونوراً في قبره، ورفعة في درجاته في الجنة.
                    </p>
                </div>

                <AutoDua />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Quran - Emerald */}
                    <button onClick={() => setCurrentView(AppView.QURAN)} className="p-6 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl hover:bg-emerald-200 dark:hover:bg-emerald-800 transition shadow-sm hover:shadow-md text-emerald-900 dark:text-emerald-100 flex flex-col items-center gap-3 border border-emerald-200 dark:border-emerald-700 group">
                        <div className="p-3 bg-white dark:bg-emerald-950 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <BookOpen size={32} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="font-bold text-lg">القرآن الكريم</span>
                    </button>
                    
                    {/* Dua - Amber */}
                    <button onClick={() => setCurrentView(AppView.DUA)} className="p-6 bg-amber-100 dark:bg-amber-900/40 rounded-2xl hover:bg-amber-200 dark:hover:bg-amber-800 transition shadow-sm hover:shadow-md text-amber-900 dark:text-amber-100 flex flex-col items-center gap-3 border border-amber-200 dark:border-amber-700 group">
                        <div className="p-3 bg-white dark:bg-amber-950 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles size={32} strokeWidth={2} className="text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="font-bold text-lg">أدعية مختارة</span>
                    </button>
                    
                    {/* Masbaha - Sky/Blue */}
                    <button onClick={() => setCurrentView(AppView.MASBAHA)} className="p-6 bg-sky-100 dark:bg-sky-900/40 rounded-2xl hover:bg-sky-200 dark:hover:bg-sky-800 transition shadow-sm hover:shadow-md text-sky-900 dark:text-sky-100 flex flex-col items-center gap-3 border border-sky-200 dark:border-sky-700 group">
                        <div className="p-3 bg-white dark:bg-sky-950 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                             <HeartHandshake size={32} strokeWidth={2} className="text-sky-600 dark:text-sky-400" />
                        </div>
                        <span className="font-bold text-lg">السبحة</span>
                    </button>
                    
                    {/* Qibla - Indigo/Violet */}
                    <button onClick={() => setCurrentView(AppView.QIBLA)} className="p-6 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition shadow-sm hover:shadow-md text-indigo-900 dark:text-indigo-100 flex flex-col items-center gap-3 border border-indigo-200 dark:border-indigo-700 group">
                        <div className="p-3 bg-white dark:bg-indigo-950 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <Compass size={32} strokeWidth={2} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="font-bold text-lg">اتجاه القبلة</span>
                    </button>
                </div>

                {/* New Share Section */}
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden text-right">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-br-full -z-0"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 w-full">
                            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2 flex items-center justify-center md:justify-start gap-2">
                                <Share2 size={24} className="text-emerald-600 dark:text-emerald-500" />
                                شارك الأجر
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
                                الدال على الخير كفاعله. شارك التطبيق مع أصدقائك وأقاربك ليكون صدقة جارية في ميزان حسناتك وحسنات الوالد {fatherName} رحمه الله.
                            </p>
                        </div>
                        <button 
                            onClick={async () => {
                                const shareUrl = window.location.href;
                                const shareText = `صدقة جارية عن روح الوالد ${fatherName} رحمه الله.\nتطبيق الرحمة: القرآن الكريم، أذكار، وتحديد القبلة.`;
                                
                                const shareData: any = {
                                    title: 'الرحمة - صدقة جارية',
                                    text: shareText,
                                };

                                // Prevent Invalid URL error by only adding URL property if it's a valid http protocol
                                if (shareUrl.startsWith('http')) {
                                    shareData.url = shareUrl;
                                } else {
                                    shareData.text = `${shareText}\n${shareUrl}`;
                                }

                                try {
                                    if (navigator.share) {
                                        await navigator.share(shareData);
                                    } else {
                                        throw new Error("Web Share API not supported");
                                    }
                                } catch (error) {
                                    console.log('Share failed or canceled', error);
                                    try {
                                        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                                        alert('تم نسخ رابط وتفاصيل التطبيق');
                                    } catch (err) {
                                        console.error('Clipboard failed', err);
                                        alert('نعتذر، لم نتمكن من نسخ الرابط تلقائياً.');
                                    }
                                }
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2 w-full md:w-auto justify-center"
                        >
                            <Share2 size={18} />
                            نشر التطبيق
                        </button>
                    </div>
                </div>
            </div>
        );
      case AppView.QURAN:
        return <QuranReader />;
      case AppView.MASBAHA:
        return <Masbaha />;
      case AppView.QIBLA:
        return <QiblaCompass />;
      case AppView.DUA:
        return <DuaGenerator fatherName={fatherName} />;
      default:
        return <div />;
    }
  };

  if (!isSetup) {
    return <Dedication fatherName={fatherName} setFatherName={setFatherName} onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col font-['Cairo'] transition-colors duration-300">
      <header className="bg-white dark:bg-stone-900 shadow-sm sticky top-0 z-40 px-4 md:px-8 py-3 flex justify-between items-center border-b border-stone-100 dark:border-stone-800 transition-colors">
        <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-500 font-['Amiri'] cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>الرحمة</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 mr-6">
                {navItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setCurrentView(item.view)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${
                            currentView === item.view
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>

        <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 rounded-full border border-stone-100 dark:border-stone-700">
                <Heart size={14} className="text-red-400 fill-current" />
                <span>صدقة جارية لـ {fatherName}</span>
            </div>
             <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
      </header>

      <main className="flex-1 w-full">
        {renderView()}
      </main>

      <IstighfarBar />
      <Navbar currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;