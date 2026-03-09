// src/global.d.ts

// Para archivos CSS y Swiper
declare module '*.css';
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper';

// Para archivos JSX/LetterGlitch
declare module '*.jsx';
declare module './components/LetterGlitch' {
  import { FC, HTMLAttributes } from 'react';
  const LetterGlitch: FC<HTMLAttributes<HTMLDivElement>>;
  export default LetterGlitch;
}