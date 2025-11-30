import React, { useState } from 'react';
import { Sparkles, Copy, Share2, Heart } from 'lucide-react';
import { generateDua } from '../services/geminiService';

interface DuaGeneratorProps {
  fatherName: string;
}

const DuaGenerator: React.FC<DuaGeneratorProps> = ({ fatherName }) => {
  const [generatedDua, setGeneratedDua] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState('general');

  const handleGenerate = async () => {
    setLoading(true);
    const dua = await generateDua(fatherName, mood);
    setGeneratedDua(dua);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDua);
    alert('تم نسخ الدعاء');
  };

  return (
    <div className="flex flex-col items-center p-6 pb-32 md:pb-20 max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4 transition-colors">
            <Sparkles className="text-amber-600 dark:text-amber-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">دعاء خاص للوالد</h2>
        <p className="text-stone-500 dark:text-stone-400 mt-2">
            قم بتوليد دعاء جديد ومميز بنية الصدقة الجارية لوالدك {fatherName}.
        </p>
      </div>

      <div className="w-full bg-white dark:bg-stone-900 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-800 overflow-hidden mb-6 transition-colors">
        <div className="p-4 bg-stone-50 dark:bg-stone-800 border-b border-stone-100 dark:border-stone-700 flex gap-2 overflow-x-auto">
            {['general', 'friday', 'patience'].map((m) => (
                <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                        mood === m 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-600'
                    }`}
                >
                    {m === 'general' ? 'دعاء عام' : m === 'friday' ? 'يوم الجمعة' : 'دعاء بالطمأنينة'}
                </button>
            ))}
        </div>
        
        <div className="p-8 min-h-[200px] flex items-center justify-center bg-gradient-to-br from-white to-stone-50 dark:from-stone-900 dark:to-stone-950 transition-colors">
            {loading ? (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-500 rounded-full animate-spin"></div>
                    <span className="text-stone-400 text-sm animate-pulse">جاري كتابة الدعاء...</span>
                </div>
            ) : generatedDua ? (
                <p className="text-xl leading-loose text-center font-['Amiri'] text-stone-800 dark:text-stone-200">
                    {generatedDua}
                </p>
            ) : (
                <p className="text-stone-400 text-center italic">
                    اضغط على الزر بالأسفل لإنشاء دعاء
                </p>
            )}
        </div>

        {generatedDua && (
            <div className="flex border-t border-stone-100 dark:border-stone-800 divide-x divide-x-reverse divide-stone-100 dark:divide-stone-800">
                <button onClick={copyToClipboard} className="flex-1 py-4 flex items-center justify-center gap-2 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 active:bg-stone-100 dark:active:bg-stone-700 transition-colors">
                    <Copy size={18} />
                    <span className="text-sm">نسخ</span>
                </button>
                <button onClick={handleGenerate} className="flex-1 py-4 flex items-center justify-center gap-2 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 active:bg-stone-100 dark:active:bg-stone-700 transition-colors">
                    <Sparkles size={18} />
                    <span className="text-sm">دعاء آخر</span>
                </button>
            </div>
        )}
      </div>

      {!generatedDua && !loading && (
        <button 
            onClick={handleGenerate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all"
        >
            إنشاء دعاء
        </button>
      )}
    </div>
  );
};

export default DuaGenerator;