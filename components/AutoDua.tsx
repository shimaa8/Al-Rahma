import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const DUAS = [
  "اللهم إنك عفو تحب العفو فاعف عنا",
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  "يا مقلب القلوب ثبت قلبي على دينك",
  "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  "اللهم اغفر للمؤمنين والمؤمنات الأحياء منهم والأموات",
  "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
  "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل",
  "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
  "اللهم صل وسلم على نبينا محمد وعلى آله وصحبه أجمعين",
  "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا",
  "اللهم اجعلنا من الذاكرين الشاكرين"
];

const AutoDua: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % DUAS.length);
        setFade(true); // Start fade in
      }, 500); // Wait for fade out to finish
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 md:p-8 shadow-lg text-white relative overflow-hidden group">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Quote size={80} className="transform rotate-180" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-10">
        <Quote size={80} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[120px] text-center">
        <p className="text-emerald-100 text-xs font-bold mb-3 tracking-wider bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm">
          دعاء ومناجاة
        </p>
        
        <div 
            className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
            <p className="text-xl md:text-2xl font-['Amiri'] leading-loose md:leading-loose drop-shadow-sm">
            "{DUAS[currentIndex]}"
            </p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {DUAS.map((_, idx) => (
            <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-white' : 'w-1 bg-white/30'
                }`}
            />
        ))}
      </div>
    </div>
  );
};

export default AutoDua;