import { Surah, Ayah } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    throw new Error('Failed to fetch surah list');
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSurahText = async (surahNumber: number): Promise<Ayah[]> => {
  try {
    // Fetching Arabic text (Uthmani)
    const response = await fetch(`${BASE_URL}/surah/${surahNumber}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data.ayahs;
    }
    throw new Error('Failed to fetch surah text');
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Curated list of high quality reciters
export const RECITERS = [
  { id: 'ar.alafasy', name: 'مشاري العفاسي', englishName: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdurrahmaansudais', name: 'عبدالرحمن السديس', englishName: 'Abdurrahmaan As-Sudais' },
  { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي', englishName: 'Maher Al Muaiqly' },
  { id: 'ar.abdulsamad', name: 'عبدالباسط عبدالصمد', englishName: 'Abdul Basit Abdul Samad' },
  { id: 'ar.husary', name: 'محمود خليل الحصري', englishName: 'Mahmoud Khalil Al-Husary' },
];

export const getAudioUrl = (reciterId: string, surahNumber: number): string => {
   // AlQuran Cloud Audio CDN structure
   // Some reciters might serve full surah files, others verse by verse. 
   // For simplicity in this app, we will use a source that provides full Surah MP3s or reconstruct it.
   // Using a reliable MP3 source (mp3quran.net is great but alquran.cloud is unified).
   // However, alquran.cloud returns audio usually per Ayah.
   // For a seamless "Listen" experience, we will use the Serve Audio functionality.
   
   // Workaround: We will return a streaming URL format commonly used.
   // Using server 7 from mp3quran as a fallback or similar if API complexity is high, 
   // but to stick to the prompt's request for "Specific Sheikhs", we'll use a direct pattern mapping.
   
   // Mapping standard IDs to reliable MP3 links (Example: download.quranicaudio.com)
   
   const num = surahNumber.toString().padStart(3, '0');
   
   switch(reciterId) {
       case 'ar.alafasy': return `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${num}.mp3`;
       case 'ar.abdurrahmaansudais': return `https://download.quranicaudio.com/quran/abdurrahmaan_as-sudais/${num}.mp3`;
       case 'ar.mahermuaiqly': return `https://download.quranicaudio.com/quran/maher_al_muaiqly/${num}.mp3`;
       case 'ar.abdulsamad': return `https://download.quranicaudio.com/quran/abdul_basit_murattal/${num}.mp3`;
       case 'ar.husary': return `https://download.quranicaudio.com/quran/mahmood_khaleel_al-husary/${num}.mp3`;
       default: return `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${num}.mp3`;
   }
};