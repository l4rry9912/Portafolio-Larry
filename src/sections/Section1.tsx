import { useCallback, useState, memo } from 'react';
import Lanyard from '@/components/Lanyard.tsx';
import LiquidEther from '@/components/LiquidEther';
import { PERSONAL_INFO } from '@/lib/constants';
import { smoothScrollToElementId } from '@/lib/smoothScroll';
import { btnPrimary, btnSecondary, surfaceGlass } from '@/lib/sectionTheme';
import { ArrowDown, Download, CheckCircle2 } from 'lucide-react';

function Section1() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleScroll = useCallback(() => {
    smoothScrollToElementId('proyectos', 880);
  }, []);

  const handleDownloadCV = () => {
    if (loading) return;
    setLoading(true);
    setMessage('');

    const link = document.createElement('a');
    link.href = PERSONAL_INFO.cvUrl;
    link.download = 'cv-larry-rodriguez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setLoading(false);
      setMessage('CV listo en tu carpeta de descargas.');
    }, 800);
  };

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Base + atmósfera */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.22),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(99,102,241,0.12),transparent),linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]"
        aria-hidden
      />
      {/* Fluido reactivo — glow y viñeta vía App.css (.liquid-ether-layer / .liquid-ether-mount) */}
      <div
        className="liquid-ether-layer pointer-events-none absolute inset-0 z-[1] min-h-full opacity-[0.42] mix-blend-soft-light md:opacity-[0.52]"
        aria-hidden
      >
        <LiquidEther
          className="liquid-ether-mount min-h-screen"
          resolution={0.38}
          iterationsPoisson={28}
          iterationsViscous={28}
          colors={['#38bdf8', '#818cf8', '#e879f9']}
          mouseForce={18}
          cursorSize={95}
          autoDemo
          autoSpeed={0.48}
          autoIntensity={2}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      {/* Copy: debajo del lanyard en pintura, legible con cristal */}
      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 pb-48 pt-28 md:px-6 md:pb-56 md:pt-32">
        <div className={`${surfaceGlass} p-8 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:p-10`}>
          <h1 className="font-['Geist_Variable'] text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl">
            Quiero{' '}
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              seguir aprendiendo
            </span>{' '}
            y trabajar en tu proyecto.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Estudio desarrollo de software; esto es lo que he ido haciendo. Si te encaja y buscas a alguien con
            ganas, escríbeme o baja el CV.
          </p>
        </div>
      </div>

      {/* Lanyard: capa media (visual + interacción 3D) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="pointer-events-auto absolute inset-0">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} interactive />
        </div>
      </div>

      {/* CTAs e iconos: encima del canvas para clicks fiables */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[10%] z-50 flex flex-col items-center gap-5 px-4 md:bottom-[12%]">
        <div className="pointer-events-auto flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleScroll}
            className={`group scroll-cta w-full sm:w-auto ${btnPrimary} py-4`}
          >
            Ver proyectos
            <ArrowDown
              className="scroll-cta-arrow h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1.15,0.53,1)] group-hover:translate-y-1.5 group-active:translate-y-2.5 group-active:duration-200"
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={handleDownloadCV}
            disabled={loading}
            className={`w-full sm:w-auto ${btnSecondary} py-4`}
          >
            {loading ? (
              'Preparando…'
            ) : (
              <>
                Descargar CV
                <Download className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
        </div>

        {message ? (
          <p className="pointer-events-auto flex items-center gap-2 text-sm font-medium text-emerald-300/95 animate-in fade-in duration-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            {message}
          </p>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[5] h-32 w-full bg-gradient-to-t from-slate-950 to-transparent"
        aria-hidden
      />
    </section>
  );
}

export default memo(Section1);
