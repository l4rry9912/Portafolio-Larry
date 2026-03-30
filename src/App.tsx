import { Suspense, lazy, memo } from 'react';
import './App.css';
import Header from '@/sections/header';
import Section1 from '@/sections/Section1';
import Footer from '@/sections/footer';

const Section2 = lazy(() => import('@/sections/Section2'));
const Section3 = lazy(() => import('@/sections/Section3'));
const Section4 = lazy(() => import('@/sections/Section4'));

const LazySectionsFallback = () => (
  <div className="min-h-[30vh] w-full" aria-hidden />
);

function App() {
  return (
    <>
      <Header />
      <main>
        <Section1 />
        <Suspense fallback={<LazySectionsFallback />}>
          <Section2 />
          <Section3 />
          <Section4 />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default memo(App);

