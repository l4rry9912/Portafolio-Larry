import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import { EDUCATION, EXPERIENCE, ABOUT_ME, OBJECTIVES } from '../lib/constants';

function Section4() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section id="sobremi" ref={ref} className="py-24 bg-gray-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Sobre mí */}
                <div className="flex flex-col items-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Sobre Mí</h2>
                    <div className="relative max-w-4xl bg-gray-800/50 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-700/50">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 p-5 rounded-3xl shadow-xl text-3xl">
                            <FaCode />
                        </div>
                        <p className="text-lg md:text-xl text-center text-gray-300 whitespace-pre-line leading-relaxed">
                            {ABOUT_ME}
                        </p>
                    </div>
                </div>

                {/* Educación y Experiencia */}
                <div className="grid lg:grid-cols-2 gap-16 mb-24">

                    {/* Educación */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-10 self-center lg:self-start">
                            <div className="bg-blue-600/20 p-3 rounded-2xl text-blue-500 text-3xl">
                                <FaGraduationCap />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">Educación</h2>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 lg:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:to-transparent before:h-full ml-4 lg:ml-0">
                            {EDUCATION.map((edu, index) => (
                                <div
                                    key={index}
                                    className={`relative pl-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="absolute left-[-5px] lg:left-[27px] top-2 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)] border-4 border-gray-900"></div>
                                    <div className="bg-gray-800/40 hover:bg-gray-800/60 p-8 rounded-3xl border border-gray-700/50 transition-colors shadow-lg">
                                        <h5 className="text-xl md:text-2xl font-bold text-white mb-1">{edu.degree}</h5>
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="text-blue-400 font-semibold">{edu.institution}</span>
                                            <span className="text-gray-500 text-sm">{edu.period}</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">{edu.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experiencia */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-10 self-center lg:self-start">
                            <div className="bg-green-600/20 p-3 rounded-2xl text-green-500 text-3xl">
                                <FaBriefcase />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">Experiencia</h2>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 lg:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-green-600 before:to-transparent before:h-full ml-4 lg:ml-0">
                            {EXPERIENCE.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`relative pl-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="absolute left-[-5px] lg:left-[27px] top-2 w-4 h-4 rounded-full bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.8)] border-4 border-gray-900"></div>
                                    <div className="bg-gray-800/40 hover:bg-gray-800/60 p-8 rounded-3xl border border-gray-700/50 transition-colors shadow-lg">
                                        <h5 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.position}</h5>
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="text-green-400 font-semibold">{exp.company}</span>
                                            <span className="text-gray-500 text-sm">{exp.period}</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Objetivos Profesionales */}
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Objetivos Profesionales</h2>
                    <div className="max-w-4xl bg-gradient-to-br from-blue-600/10 to-transparent p-10 md:p-14 rounded-[2.5rem] border border-blue-500/20 shadow-2xl">
                        <p className="text-lg md:text-xl text-center text-gray-300 whitespace-pre-line leading-relaxed italic">
                            "{OBJECTIVES}"
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Section4;