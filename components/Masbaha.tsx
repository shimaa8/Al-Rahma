import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Bell, BellRing, X, Clock } from 'lucide-react';

const Masbaha: React.FC = () => {
  const [count, setCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentDhikr, setCurrentDhikr] = useState('سبحان الله');
  
  // Reminder State
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderValue, setReminderValue] = useState(15);
  const [reminderUnit, setReminderUnit] = useState<'minutes' | 'hours'>('minutes');
  const [isReminderActive, setIsReminderActive] = useState(false);

  const dhikrOptions = [
    'سبحان الله',
    'الحمد لله',
    'الله أكبر',
    'لا إله إلا الله',
    'استغفر الله',
    'لا حول ولا قوة إلا بالله',
    'سبحان الله وبحمده',
    'سبحان الله العظيم'
  ];

  // Move audio creation outside render or use ref to avoid recreating
  const clickSoundRef = useRef(new Audio('https://assets.mixkit.co/sfx/preview/mixkit-mechanical-typewriter-keystroke-1445.mp3'));
  const notificationSoundRef = useRef(new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3'));

  // Load settings on mount
  useEffect(() => {
    const savedActive = localStorage.getItem('masbaha_reminder_active') === 'true';
    const savedValue = parseInt(localStorage.getItem('masbaha_reminder_value') || '15');
    const savedUnit = (localStorage.getItem('masbaha_reminder_unit') as 'minutes' | 'hours') || 'minutes';
    
    // Load persisted count and dhikr
    const savedCount = parseInt(localStorage.getItem('masbaha_count') || '0');
    const savedDhikr = localStorage.getItem('masbaha_dhikr');

    setIsReminderActive(savedActive);
    setReminderValue(savedValue);
    setReminderUnit(savedUnit);
    
    if (savedDhikr && dhikrOptions.includes(savedDhikr)) {
      setCurrentDhikr(savedDhikr);
    }
    if (!isNaN(savedCount)) {
      setCount(savedCount);
    }
  }, []);

  // Handle Reminder Logic
  useEffect(() => {
    let intervalId: any;

    if (isReminderActive) {
      // Calculate milliseconds
      const ms = reminderUnit === 'minutes' ? reminderValue * 60000 : reminderValue * 3600000;
      
      intervalId = setInterval(() => {
        if (Notification.permission === 'granted') {
          // Send Notification
          new Notification("تذكير بذكر الله", {
            body: `حان الوقت لقول: ${currentDhikr}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/3655/3655586.png',
            lang: 'ar'
          });
          
          // Play sound if enabled
          if (soundEnabled) {
             notificationSoundRef.current.currentTime = 0;
             notificationSoundRef.current.play().catch(e => console.log('Audio play failed', e));
          }
        } else if (Notification.permission !== 'denied') {
            // Try to request permission again if not denied explicitly
            Notification.requestPermission();
        }
      }, ms);
    }

    return () => clearInterval(intervalId);
  }, [isReminderActive, reminderValue, reminderUnit, currentDhikr, soundEnabled]);

  const handleCount = () => {
    setCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('masbaha_count', newCount.toString());
      return newCount;
    });
    
    if (soundEnabled) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.volume = 0.5;
      clickSoundRef.current.play().catch(e => console.log('Audio play failed', e));
    }
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const reset = () => {
    if(window.confirm('هل تريد تصفير العداد؟')) {
        setCount(0);
        localStorage.setItem('masbaha_count', '0');
    }
  };

  const toggleReminder = async () => {
    if (!isReminderActive) {
        if (!("Notification" in window)) {
            alert("المتصفح لا يدعم التنبيهات");
            return;
        }

        let permission = Notification.permission;
        if (permission === 'default') {
            permission = await Notification.requestPermission();
        }

        if (permission === 'granted') {
            setIsReminderActive(true);
            localStorage.setItem('masbaha_reminder_active', 'true');
            // Save current values too
            localStorage.setItem('masbaha_reminder_value', reminderValue.toString());
            localStorage.setItem('masbaha_reminder_unit', reminderUnit);
            
            new Notification("تم تفعيل التذكير", { body: `سيتم تذكيرك بـ "${currentDhikr}" كل ${reminderValue} ${reminderUnit === 'minutes' ? 'دقيقة' : 'ساعة'}` });
            setShowReminderModal(false);
        } else {
            alert("يرجى السماح بالإشعارات لتفعيل خدمة التذكير");
        }
    } else {
        setIsReminderActive(false);
        localStorage.setItem('masbaha_reminder_active', 'false');
    }
  };

  const saveSettings = () => {
      localStorage.setItem('masbaha_reminder_value', reminderValue.toString());
      localStorage.setItem('masbaha_reminder_unit', reminderUnit);
      if(isReminderActive) {
          alert("تم حفظ الإعدادات");
          setShowReminderModal(false);
      } else {
          toggleReminder(); // This will enable it and save
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 pb-32 md:pb-20 space-y-8 animate-fade-in relative">
      <div className="w-full flex justify-between items-center max-w-sm">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-500">السبحة الإلكترونية</h2>
        <div className="flex gap-2">
            <button 
                onClick={() => setShowReminderModal(true)}
                className={`p-2 rounded-full transition-colors ${
                  isReminderActive 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500' 
                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}
            >
                {isReminderActive ? <BellRing size={24} /> : <Bell size={24} />}
            </button>
            <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
            >
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-xl p-6 border border-stone-200 dark:border-stone-800 relative overflow-hidden transition-colors">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -z-0 opacity-50"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-full">
                <label className="text-stone-500 dark:text-stone-400 text-sm font-semibold mb-2 block">اختر الذكر</label>
                <select 
                    value={currentDhikr}
                    onChange={(e) => {
                        const newDhikr = e.target.value;
                        setCurrentDhikr(newDhikr);
                        setCount(0);
                        localStorage.setItem('masbaha_dhikr', newDhikr);
                        localStorage.setItem('masbaha_count', '0');
                    }}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-lg font-bold text-stone-700 dark:text-stone-200 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    {dhikrOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-950 flex items-center justify-center border-4 border-white dark:border-stone-700 shadow-[0_0_20px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <span className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
                    {count}
                </span>
            </div>

            <button 
                onClick={handleCount}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xl font-bold py-6 rounded-2xl shadow-lg transform active:scale-95 transition-all duration-100"
            >
                تسبيح
            </button>
            
            <button 
                onClick={reset}
                className="flex items-center gap-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            >
                <RotateCcw size={16} />
                <span className="text-sm">تصفير العداد</span>
            </button>
        </div>
      </div>
      
      <p className="text-center text-stone-500 dark:text-stone-400 text-sm max-w-xs">
        قال رسول الله ﷺ: "ألا أنبئكم بخير أعمالكم، وأزكاها عند مليككم، وأرفعها في درجاتكم..." ذكر الله تعالى.
      </p>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-stone-900 w-full max-w-xs p-6 rounded-3xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border-2 border-emerald-100 dark:border-stone-700">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-500">
                        <Clock size={24} />
                        <h3 className="font-bold text-lg">تنبيهات الذكر</h3>
                    </div>
                    <button 
                        onClick={() => setShowReminderModal(false)}
                        className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition"
                    >
                        <X size={24}/>
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-stone-600 dark:text-stone-400 mb-2 block">تكرار التنبيه كل:</label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                min="1" 
                                max="60"
                                value={reminderValue} 
                                onChange={(e) => setReminderValue(parseInt(e.target.value) || 1)}
                                className="w-20 p-3 text-center rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-bold text-stone-800 dark:text-stone-200 focus:border-emerald-500 outline-none"
                            />
                            <select 
                                value={reminderUnit} 
                                onChange={(e) => setReminderUnit(e.target.value as 'minutes' | 'hours')}
                                className="flex-1 p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200 outline-none focus:border-emerald-500"
                            >
                                <option value="minutes">دقيقة</option>
                                <option value="hours">ساعة</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-xs text-amber-700 dark:text-amber-500 leading-relaxed border border-amber-100 dark:border-amber-900/30">
                        ملاحظة: لضمان وصول التنبيهات، يفضل إبقاء صفحة الموقع مفتوحة في المتصفح (حتى لو في الخلفية).
                    </div>
                    
                    <button 
                        onClick={saveSettings}
                        className={`w-full py-3.5 rounded-xl font-bold shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 ${
                            isReminderActive 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                    >
                       {isReminderActive ? 'حفظ التعديلات' : 'تفعيل التذكير'}
                    </button>

                    {isReminderActive && (
                         <button 
                            onClick={toggleReminder}
                            className="w-full py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                        >
                            إيقاف التذكير
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Masbaha;