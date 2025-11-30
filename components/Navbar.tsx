import React from 'react';
import { BookOpen, Compass, Home, HeartHandshake, Settings, Sparkles } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: 'الرئيسية' },
    { view: AppView.QURAN, icon: BookOpen, label: 'القرآن' },
    { view: AppView.MASBAHA, icon: HeartHandshake, label: 'السبحة' },
    { view: AppView.DUA, icon: Sparkles, label: 'دعاء' },
    { view: AppView.QIBLA, icon: Compass, label: 'القبلة' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-lg pb-safe z-50 transition-colors duration-300">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              currentView === item.view
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
            }`}
          >
            <item.icon size={24} strokeWidth={currentView === item.view ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;