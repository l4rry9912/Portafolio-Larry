import { memo } from 'react';
import { FaGithub, FaFilePdf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import LetterGlitch from '@/components/LetterGlitch';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { PROJECTS } from '@/lib/constants';
import {
  sectionBg,
  sectionContainer,
  sectionY,
  sectionTitle,
  surfaceCard,
  textBody,
  btnPrimary,
  btnSecondary
} from '@/lib/sectionTheme';

import '../../node_modules/swiper/swiper.min.css';
import '../../node_modules/swiper/modules/navigation/navigation.min.css';
import '../../node_modules/swiper/modules/pagination/pagination.min.css';

function Section2() {
  return (
    <section
      className={`${sectionBg} ${sectionY} scroll-mt-28 md:scroll-mt-32`}
      id="proyectos"
    >
      <div className={sectionContainer}>
        <h2 className={sectionTitle}>Mis Proyectos</h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {PROJECTS.map((project: (typeof PROJECTS)[number], index: number) => (
            <div
              key={index}
              className={`group relative flex min-h-0 flex-col overflow-hidden ${surfaceCard} shadow-lg md:shadow-xl`}
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-[0.32] md:opacity-[0.28]">
                <LetterGlitch
                  glitchSpeed={38}
                  centerVignette={true}
                  outerVignette={false}
                  smooth={true}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <h3 className="px-4 pb-2 pt-6 text-center font-['Geist_Variable'] text-xl font-bold text-white italic md:text-2xl">
                  {project.title}
                </h3>

                <div className="mt-4 px-4">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                  >
                    {project.images.map((img: string, idx: number) => (
                      <SwiperSlide
                        key={idx}
                        className="flex h-64 items-center justify-center sm:h-80 md:h-96"
                      >
                        <img
                          src={img}
                          alt={`${project.title} ${idx + 1}`}
                          className="pointer-events-none max-h-full max-w-full select-none object-contain p-2"
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className={`flex-1 text-center text-sm ${textBody} md:text-base`}>
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnPrimary}
                    >
                      GitHub
                      <FaGithub className="text-lg" aria-hidden />
                    </a>

                    {project.pdfLink ? (
                      <a
                        href={project.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnSecondary}
                      >
                        TFG
                        <FaFilePdf className="text-lg text-red-400" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Section2);
