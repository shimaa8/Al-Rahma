import React, { useState, useEffect } from 'react';
import { Compass, Navigation } from 'lucide-react';

const QiblaCompass: React.FC = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Kaaba coordinates
  const KAABA_LAT = 21.422487;
  const KAABA_LONG = 39.826206;

  const calculateQibla = (latitude: number, longitude: number) => {
    const phiK = (KAABA_LAT * Math.PI) / 180.0;
    const lambdaK = (KAABA_LONG * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    
    const y = Math.sin(lambdaK - lambda);
    const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
    let qibla = (Math.atan2(y, x) * 180.0) / Math.PI;
    
    return (qibla + 360) % 360;
  };

  const startCompass = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const qibla = calculateQibla(latitude, longitude);
        setQiblaDirection(qibla);
        setPermissionGranted(true);
      },
      (err) => {
        setError("يرجى تفعيل خدمة الموقع لتحديد القبلة.");
        console.error(err);
      }
    );

    // Device orientation for rotating compass (Mobile only)
    if (window.DeviceOrientationEvent) {
      // @ts-ignore - iOS 13+ permission check
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
         // @ts-ignore
         DeviceOrientationEvent.requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // alpha is compass heading (0 = North) in degrees
    // webkitCompassHeading is for iOS
    // @ts-ignore
    let compass = event.webkitCompassHeading || Math.abs(event.alpha - 360);
    setHeading(compass);
  };

  // Difference between phone heading and Qibla angle
  const needleRotation = heading !== null ? qiblaDirection - heading : qiblaDirection;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 pb-32 md:pb-20 animate-fade-in text-center">
      <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-500 mb-2">اتجاه القبلة</h2>
      
      {!permissionGranted ? (
        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-lg max-w-sm w-full transition-colors">
            <Compass className="w-16 h-16 text-emerald-600 dark:text-emerald-500 mx-auto mb-4" />
            <p className="text-stone-600 dark:text-stone-300 mb-6">
                لتحديد اتجاه القبلة بدقة، نحتاج إلى الوصول لموقعك الجغرافي.
            </p>
            {error && <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}
            <button 
                onClick={startCompass}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold w-full hover:bg-emerald-700 transition"
            >
                السماح وتحديد القبلة
            </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <div className="relative w-72 h-72 rounded-full border-4 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-2xl flex items-center justify-center mb-8 transition-colors">
                {/* Compass Rose Background */}
                <div 
                    className="absolute w-full h-full rounded-full transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${heading ? -heading : 0}deg)` }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-stone-400 dark:text-stone-500 font-bold">N</div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-stone-400 dark:text-stone-500 font-bold">S</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 font-bold">E</div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 font-bold">W</div>
                    
                    {/* Ticks */}
                    {[0, 90, 180, 270].map(deg => (
                         <div 
                            key={deg} 
                            className="absolute w-0.5 h-3 bg-stone-300 dark:bg-stone-600 left-1/2 top-0 origin-bottom"
                            style={{ transformOrigin: '50% 144px', transform: `rotate(${deg}deg)` }}
                         />
                    ))}
                </div>

                {/* Qibla Indicator (Kaaba Icon) */}
                <div 
                    className="absolute w-full h-full flex justify-center pt-8 transition-transform duration-500 ease-out z-10"
                    style={{ transform: `rotate(${heading !== null ? qiblaDirection - heading : qiblaDirection}deg)` }}
                >
                    <div className="flex flex-col items-center">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/5359/5359939.png" 
                            alt="Kaaba" 
                            className="w-10 h-10 drop-shadow-md"
                        />
                        <div className="w-1 h-20 bg-emerald-500 rounded-full mt-1 shadow-md"></div>
                    </div>
                </div>

                {/* Center Point */}
                <div className="w-4 h-4 bg-stone-800 dark:bg-stone-200 rounded-full z-20 border-2 border-white dark:border-stone-800"></div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 px-6 py-4 rounded-xl border border-emerald-100 dark:border-emerald-800 transition-colors">
                <p className="text-emerald-800 dark:text-emerald-400 font-bold text-lg mb-1">
                    {Math.round(qiblaDirection)}° من الشمال
                </p>
                {heading === null && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                        * هذا هو الاتجاه الجغرافي. استخدم البوصلة في هاتفك وتوجه نحو الزاوية المذكورة.
                    </p>
                )}
                 {heading !== null && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                        قم بتدوير الهاتف حتى تشير الكعبة إلى الأعلى
                    </p>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default QiblaCompass;