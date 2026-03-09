import { FaGithub, FaFilePdf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import LetterGlitch from './components/LetterGlitch';
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
    {
        title: "My Agenda",
        images: [
            '/imagenes/MyAgenda1.png',
            '/imagenes/MyAgenda2.png',
            '/imagenes/MyAgenda3.png',
        ],
        description:
            "Mi Trabajo Final de Grado Superior realizado con Java, SQLite y Firebase en Android Studio. My Agenda es una aplicación que facilita la gestión de notas y calendarios integrando estas funcionalidades en una sola app. Permite la gestión de múltiples calendarios, notas y tareas. Además, ofrece la posibilidad de sincronizar los datos con Firebase para asegurar su disponibilidad en cualquier momento y lugar.",
        repoLink: "https://github.com/l4rry9912/MyAgenda",
        pdfLink: "/TFG_LarryRodriguez_DAM.docx.pdf",
    },
    {
        title: "GeneradorBase Universae",
        images: [
            '/imagenes/Generador1.png',
            '/imagenes/Generador2.png',
            '/imagenes/Generador3.png',
        ],
        description:
            "Aplicación de escritorio para cargar, modificar y guardar preguntas tipo test desde un archivo CSV, además incluye la funcionalidad para comprimir estas en un archivo ZIP. Desarrollada en Java y Swing con Ant, utilizando Java 8 y JDK 17 en ApacheNetbeans.",
        repoLink: "https://github.com/l4rry9912/GeneradorUniversae",
    },
    {
        title: "Launcher Universae",
        images: [
            '/imagenes/Launcher1.png',
            '/imagenes/Launcher2.png',
            '/imagenes/Launcher3.png',
        ],
        description:
            "Launcher a pantalla completa para lanzar simuladores educativos en ferias. Interfaz interactiva con miniaturas de grados y carrusel de imágenes de simuladores. Desarrollado con Java y Swing utilizando Java 8 y JDK 17 en ApacheNetbeans",
        repoLink: "https://github.com/lalovalls/LauncherUniversae",
    },
    {
        title: "WEB Universae",
        images: [
            '/imagenes/WebUniversae1.png',
            '/imagenes/WebUniversae2.png',
            '/imagenes/WebUniversae3.png',
        ],
        description:
            "Web para la demostración de simuladores educativos de Universae. Permite a los usuarios seleccionar y jugar diferentes simuladores. La plataforma está desarrollada en HTML, CSS y JavaScript.",
        repoLink: "https://github.com/lalovalls/WEB-UNIVERSAE",
    },
];

function Section2() {
    return (
        <section className="py-16 bg-gray-900" id="proyectos">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                    Mis Proyectos
                </h2>

                <div className="grid gap-8 md:grid-cols-2">

                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-700"
                        >

                            {/* Fondo glitch */}
                            <div className="absolute inset-0 opacity-40">
                                <LetterGlitch
                                    glitchSpeed={50}
                                    centerVignette={true}
                                    outerVignette={false}
                                    smooth={true}
                                />
                            </div>

                            {/* Contenido */}
                            <div className="relative z-10 flex flex-col h-full">

                                <h3 className="text-2xl font-semibold text-center text-white mt-4 backdrop-blur  rounded-2xl ">
                                    {project.title}
                                </h3>

                                {/* Swiper */}
                                <div className="mt-4 px-4">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={true}
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                    >
                                        {project.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <img
                                                    src={img}
                                                    alt={`${project.title} ${idx + 1}`}
                                                    className="w-full h-80 object-contain rounded-lg select-none pointer-events-none"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <p className="text-white text-center mt-5 py-4 flex-1 backdrop-blur-sm  rounded-2xl shadow-2xl">
                                    {project.description}
                                </p>

                                <div className="flex justify-center items-center gap-4 py-4 flex-wrap">

                                    <a
                                        href={project.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition"
                                    >
                                        Repositorio <FaGithub />
                                    </a>

                                    {project.pdfLink && (
                                        <a
                                            href={project.pdfLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-full transition"
                                        >
                                            TFG <FaFilePdf />
                                        </a>
                                    )}

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