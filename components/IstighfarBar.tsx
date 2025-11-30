import React from 'react';

const PHRASES = [
  "أستغفر الله العظيم وأتوب إليه",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  "اللهم صل وسلم على نبينا محمد",
  "لا حول ولا قوة إلا بالله العلي العظيم",
  "اللهم إنك عفو تحب العفو فاعف عنا",
  "رب اغفر لي ولوالدي وللمؤمنين والمؤمنات",
  "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر",
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  "يا حي يا قيوم برحمتك أستغيث"
];

const IstighfarBar: React.FC = () => {
  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-emerald-900 text-emerald-50 h-10 flex items-center z-40 overflow-hidden border-t border-emerald-800 shadow-lg">
      <div className="ticker-wrap w-full overflow-hidden">
        <div className="ticker flex items-center whitespace-nowrap">
            {/* Render phrases multiple times to ensure smooth infinite scroll */}
            {PHRASES.map((phrase, index) => (
            <div key={`a-${index}`} className="ticker-item mx-8 text-sm md:text-base font-medium inline-flex items-center">
                <span className="text-emerald-400 mx-2 text-xs">◆</span>
                {phrase}
            </div>
            ))}
            {PHRASES.map((phrase, index) => (
            <div key={`b-${index}`} className="ticker-item mx-8 text-sm md:text-base font-medium inline-flex items-center">
                <span className="text-emerald-400 mx-2 text-xs">◆</span>
                {phrase}
            </div>
            ))}
        </div>
      </div>
      <style>{`
        .ticker-wrap {
            width: 100%;
            overflow: hidden;
            background-color: transparent;
        }
        .ticker {
            display: flex;
            animation: ticker 60s linear infinite;
            width: max-content;
        }
        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); } 
        }
        /* In RTL, positive translate moves content to the right. 
           If the animation looks like it's moving backwards, 
           we can switch to translateX(-50%) */
      `}</style>
    </div>
  );
};

export default IstighfarBar;