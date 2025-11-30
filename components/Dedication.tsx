import React from 'react';

interface DedicationProps {
  fatherName: string;
  setFatherName: (name: string) => void;
  onStart: () => void;
}

const Dedication: React.FC<DedicationProps> = ({ fatherName, setFatherName, onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8 p-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800 shadow-inner">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4358/4358667.png" 
            alt="Islamic Art" 
            className="w-24 h-24 md:w-32 md:h-32 opacity-80"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-500 mb-4 font-['Amiri']">
          صدقة جارية
        </h1>
        
        <p className="text-stone-600 dark:text-stone-300 mb-10 max-w-sm leading-relaxed text-base md:text-lg">
          اللهم اجعل هذا العمل خالصاً لوجهك الكريم، ونوراً ورحمةً لروح والدي.
        </p>

        <div className="w-full space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium text-stone-500 dark:text-stone-400 mb-2 text-right">
              اسم الوالد (رحمه الله)
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="اكتب الاسم هنا..."
              className="w-full px-5 py-4 rounded-xl border border-stone-300 dark:border-stone-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 outline-none transition-all text-right bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 shadow-sm"
              onKeyDown={(e) => e.key === 'Enter' && onStart()}
            />
          </div>

          <button
            onClick={onStart}
            className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <span>دخول التطبيق</span>
          </button>
        </div>

        <div className="mt-12 p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30 w-full">
          <p className="text-amber-800 dark:text-amber-500 text-sm md:text-base font-['Amiri'] leading-loose">
            "إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلا مِنْ ثَلاثٍ: مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dedication;