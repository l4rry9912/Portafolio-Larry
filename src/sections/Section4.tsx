import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import { EDUCATION, EXPERIENCE, ABOUT_ME, OBJECTIVES } from '@/lib/constants';
import {
  sectionBg,
  sectionContainer,
  sectionY,
  sectionTitle,
  sectionHeadingSm,
  surfaceGlass,
  surfaceCard,
  textBody,
  textMuted,
  accentText
} from '@/lib/sectionTheme';

function Section4() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
        <section
            id="sobremi"
            ref={ref}
            className={`${sectionBg} ${sectionY} scroll-mt-28 overflow-hidden md:scroll-mt-32`}
        >
      <div className={sectionContainer}>
        <div className="mb-20 flex flex-col items-center md:mb-24">
          <h2 className={sectionTitle}>Sobre Mí</h2>
          <div className={`relative max-w-4xl p-10 md:p-14 ${surfaceGlass}`}>
            <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 p-5 text-3xl text-white shadow-xl shadow-blue-900/40">
              <FaCode aria-hidden />
            </div>
            <p className={`text-center text-lg md:text-xl ${textBody} whitespace-pre-line`}>
              {ABOUT_ME}
            </p>
          </div>
        </div>

        <div className="mb-20 grid gap-16 lg:mb-24 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-10 flex items-center gap-4 self-center lg:self-start">
              <div className={`rounded-2xl border border-sky-400/30 bg-sky-500/10 p-3 text-3xl ${accentText}`}>
                <FaGraduationCap aria-hidden />
              </div>
              <h3 className={sectionHeadingSm}>Educación</h3>
            </div>

            <div className="relative ml-4 space-y-8 before:absolute before:inset-0 before:h-full before:w-px before:bg-gradient-to-b before:from-sky-500 before:to-transparent lg:ml-0 lg:before:left-8">
              {EDUCATION.map((edu: (typeof EDUCATION)[number], index: number) => (
                <div
                  key={index}
                  className={`relative pl-12 transition-all duration-1000 ${
                    inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute left-[-5px] top-2 h-4 w-4 rounded-full border-4 border-slate-950 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.75)] lg:left-[27px]" />
                  <div className={`p-8 ${surfaceCard}`}>
                    <h5 className="mb-1 text-xl font-bold text-white md:text-2xl">{edu.degree}</h5>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className={`font-semibold ${accentText}`}>{edu.institution}</span>
                      <span className={`text-sm ${textMuted}`}>{edu.period}</span>
                    </div>
                    <p className={textBody}>{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-10 flex items-center gap-4 self-center lg:self-start">
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-3xl text-emerald-400">
                <FaBriefcase aria-hidden />
              </div>
              <h3 className={sectionHeadingSm}>Experiencia</h3>
            </div>

            <div className="relative ml-4 space-y-8 before:absolute before:inset-0 before:h-full before:w-px before:bg-gradient-to-b before:from-emerald-500 before:to-transparent lg:ml-0 lg:before:left-8">
              {EXPERIENCE.map((exp: (typeof EXPERIENCE)[number], index: number) => (
                <div
                  key={index}
                  className={`relative pl-12 transition-all duration-1000 ${
                    inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute left-[-5px] top-2 h-4 w-4 rounded-full border-4 border-slate-950 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.75)] lg:left-[27px]" />
                  <div className={`p-8 ${surfaceCard}`}>
                    <h5 className="mb-1 text-xl font-bold text-white md:text-2xl">{exp.position}</h5>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="font-semibold text-emerald-400">{exp.company}</span>
                      <span className={`text-sm ${textMuted}`}>{exp.period}</span>
                    </div>
                    <p className={textBody}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className={sectionTitle}>Objetivos Profesionales</h2>
          <div
            className={`max-w-4xl rounded-[2.5rem] border border-sky-400/25 bg-gradient-to-br from-sky-500/10 to-transparent p-10 shadow-2xl md:p-14`}
          >
            <p className={`text-center text-lg italic md:text-xl ${textBody} whitespace-pre-line`}>
              &ldquo;{OBJECTIVES}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Section4);
