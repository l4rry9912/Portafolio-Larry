import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';

function Section4() {

    const educationData = [
        {
            institution: 'Las Americas IED',
            degree: 'Bachillerato',
            period: '2006 - 2018',
            description: 'Cursé mi bachillerato en Las Americas IED.'
        },
        {
            institution: 'Universae',
            degree: 'Desarrollo de Aplicaciones Multiplataforma',
            period: '2022 - 2024',
            description: 'Realicé mi grado superior de Desarrollo de Aplicaciones Multiplataforma.'
        },
        {
            institution: 'IES Clara del Rey',
            degree: 'Desarrollo de Aplicaciones Web',
            period: '2025 - Actualmente',
            description: 'Me encuentro realizando mi grado superior de Desarrollo de Aplicaciones Web.'
        }
    ];

    const experienceData = [
        {
            company: 'High Education',
            position: 'Prácticas',
            period: '3 meses',
            description: 'Prácticas en desarrollo de software y web.'
        }
    ];

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const aboutMeContent = `Soy estudiante de desarrollo de software. He finalizado el ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM) y actualmente estoy cursando Desarrollo de Aplicaciones Web (DAW), donde sigo ampliando mis conocimientos en programación y tecnologías web.
Me gusta aprender nuevas herramientas y enfrentarme a problemas de desarrollo que me ayuden a mejorar mis habilidades técnicas.
Mi objetivo es seguir creciendo como desarrollador, participando en proyectos que me permitan aplicar lo que aprendo y ganar experiencia práctica en el mundo del software.`;

    const objectivesContent = `Mis objetivos profesionales se centran en seguir formándome como desarrollador, mejorando mis habilidades en el desarrollo de software y especializándome en el desarrollo de aplicaciones web y multiplataforma. Me gustaría participar en proyectos reales que me permitan crecer técnica y profesionalmente mientras sigo aprendiendo nuevas tecnologías.`;

    return (
        <section id="sobremi" ref={ref} className="py-16 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4">

                {/* Sobre mí */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sobre Mí</h2>
                <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12">
                    <p className="text-center text-gray-300 whitespace-pre-line">{aboutMeContent}</p>
                    <div className="text-blue-600 text-6xl text-center mt-4">
                        <FaCode />
                    </div>
                </div>

                {/* Educación y Experiencia */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* Educación */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Educación</h2>
                        {educationData.map((edu, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 rounded-3xl shadow-lg p-6 mb-6 transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="text-blue-600 text-6xl text-center mb-3">
                                    <FaGraduationCap />
                                </div>
                                <h5 className="text-center text-lg md:text-xl font-bold text-white">{edu.degree} - {edu.institution}</h5>
                                <p className="text-center text-gray-400 mb-2">{edu.period}</p>
                                <p className="text-center text-gray-300">{edu.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Experiencia */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Experiencia Laboral</h2>
                        {experienceData.map((exp, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 rounded-3xl shadow-lg p-6 mb-6 transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="text-blue-600 text-6xl text-center mb-3">
                                    <FaBriefcase />
                                </div>
                                <h5 className="text-center text-lg md:text-xl font-bold text-white">{exp.position} - {exp.company}</h5>
                                <p className="text-center text-gray-400 mb-2">{exp.period}</p>
                                <p className="text-center text-gray-300">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Objetivos Profesionales */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Objetivos Profesionales</h2>
                <div className="bg-gray-800 rounded-3xl shadow-2xl p-8">
                    <p className="text-center text-gray-300 whitespace-pre-line">{objectivesContent}</p>
                </div>

            </div>
        </section>
    );
}

export default Section4;