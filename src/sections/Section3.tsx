import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '@/lib/constants';
import {
  sectionBg,
  sectionContainer,
  sectionY,
  sectionTitle,
  surfaceCard,
  textMuted,
  accentText,
  progressTrack,
  progressFill
} from '@/lib/sectionTheme';

function Section3() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
        <section
            id="habilidades"
            ref={ref}
            className={`${sectionBg} ${sectionY} scroll-mt-28 overflow-hidden md:scroll-mt-32`}
        >
      <div className={sectionContainer}>
        <h2 className={sectionTitle}>Habilidades Técnicas</h2>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {SKILLS.map((skill: (typeof SKILLS)[number], index: number) => (
            <div
              key={index}
              className={`group relative flex flex-col p-8 ${surfaceCard} hover:-translate-y-1`}
            >
              <div className="mb-8 flex items-center gap-5">
                <skill.icon
                  className={`${skill.color} h-10 w-10 shrink-0 transition-transform duration-500 group-hover:scale-110`}
                  aria-hidden
                />
                <h4 className="font-['Geist_Variable'] text-xl font-bold text-white md:text-2xl">
                  {skill.name}
                </h4>
              </div>

              <div className={progressTrack}>
                <div
                  className={progressFill}
                  style={{ width: `${inView ? skill.level : 0}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={`text-sm font-medium ${textMuted}`}>Nivel de dominio</span>
                <span className={`text-lg font-bold ${accentText}`}>{skill.level}%</span>
              </div>

              <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-2 w-2 animate-ping rounded-full bg-sky-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Section3);
