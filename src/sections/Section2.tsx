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

                            {/* Fondo glitch (Optimizado: menor opacidad, solo decorativo) */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <LetterGlitch
                                    glitchSpeed={50}
                                    centerVignette={true}
                                    outerVignette={false}
                                    smooth={true}
                                />
                            </div>

                            {/* Contenido */}
                            <div className="relative z-10 flex flex-col h-full p-1">

                                <h3 className="text-2xl font-bold text-center text-white py-4 px-2">
                                    {project.title}
                                </h3>

                                {/* Swiper */}
                                <div className="mt-2 px-4">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        className="rounded-2xl overflow-hidden shadow-inner"
                                    >
                                        {project.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="bg-gray-800/50 flex items-center justify-center">
                                                    <img
                                                        src={img}
                                                        alt={`${project.title} screenshot ${idx + 1}`}
                                                        className="w-full h-80 object-cover md:object-contain rounded-lg select-none pointer-events-none transform transition-transform group-hover:scale-105 duration-700"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-gray-300 text-center leading-relaxed flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
                                        <a
                                            href={project.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                                        >
                                            Repositorio <FaGithub className="text-xl" />
                                        </a>

                                        {project.pdfLink && (
                                            <a
                                                href={project.pdfLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                                            >
                                                Documentación <FaFilePdf className="text-xl text-red-500" />
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