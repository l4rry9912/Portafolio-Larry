import { FaGithub, FaFilePdf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import LetterGlitch from '../components/LetterGlitch';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { PROJECTS } from '../lib/constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Section2() {
    return (
        <section className="py-20 bg-gray-900 border-t border-gray-800" id="proyectos">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
                    Mis Proyectos
                </h2>

                <div className="grid gap-10 md:grid-cols-2">

                    {PROJECTS.map((project, index) => (
                        <div
                            key={index}
                            className="group relative rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-blue-500/50"
                        >

                            {/* Fondo glitch */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <LetterGlitch
                                    glitchSpeed={50}
                                    centerVignette={true}
                                    outerVignette={false}
                                    smooth={true}
                                />
                            </div>

                            {/* Contenido */}
                            <div className="relative z-10 flex flex-col h-full">

                                <h3 className="text-2xl font-bold text-center text-white pt-6 pb-2 px-4 italic">
                                    {project.title}
                                </h3>

                                {/* Swiper */}
                                <div className="mt-4 px-4">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        className="rounded-2xl overflow-hidden bg-black/40"
                                    >
                                        {project.images.map((img, idx) => (
                                            <SwiperSlide key={idx} className="flex items-center justify-center h-64 sm:h-80 md:h-96">
                                                <img
                                                    src={img}
                                                    alt={`${project.title} ${idx + 1}`}
                                                    className="max-w-full max-h-full object-contain select-none pointer-events-none p-2"
                                                    loading="lazy"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-gray-300 text-center text-sm md:text-base leading-relaxed flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base"
                                        >
                                            Github <FaGithub className="text-lg" />
                                        </a>

                                        {project.pdfLink && (
                                            <a
                                                href={project.pdfLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold px-5 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base"
                                            >
                                                TFG <FaFilePdf className="text-lg text-red-500" />
                                            </a>
                                        )}
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

export default Section2;