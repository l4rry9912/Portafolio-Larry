import { Suspense, lazy } from 'react';
import './sections/App.css';

// Lazy loading sections for improved performance
const Header = lazy(() => import('./sections/header.tsx'));
const Section1 = lazy(() => import('./sections/Section1.tsx'));
const Section2 = lazy(() => import('./sections/Section2.tsx'));
const Section3 = lazy(() => import('./sections/Section3.tsx'));
const Section4 = lazy(() => import('./sections/Section4.tsx'));
const Footer = lazy(() => import('./sections/footer.tsx'));

const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="animate-pulse text-2xl font-bold">Cargando...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Header />
      <main>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </main>
      <Footer />
    </Suspense>
  );
}

export default App;