export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface QuranEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface Reciter {
  id: string;
  name: string;
  url: string; // Base URL for audio
}

export enum AppView {
  HOME = 'HOME',
  QURAN = 'QURAN',
  QIBLA = 'QIBLA',
  MASBAHA = 'MASBAHA',
  DUA = 'DUA',
  SETTINGS = 'SETTINGS'
}