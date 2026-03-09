import { useInView } from 'react-intersection-observer';
import { SKILLS } from '../lib/constants';

function Section3() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section
            id="habilidades"
            ref={ref}
            className="py-24 bg-gray-900 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20">
                    Habilidades Técnicas
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILLS.map((skill, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-blue-500/50 hover:-translate-y-2 shadow-xl"
                        >
                            {/* Icono + nombre */}
                            <div className="flex items-center gap-5 mb-8">
                                <skill.icon className={`${skill.color} w-10 h-10 transition-transform duration-500 group-hover:scale-110`} />
                                <h4 className="text-white text-2xl font-bold">{skill.name}</h4>
                            </div>

                            {/* Barra de progreso */}
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1500 ease-out"
                                    style={{ width: `${inView ? skill.level : 0}%` }}
                                ></div>
                            </div>

                            {/* Porcentaje */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm font-medium">Nivel de dominio</span>
                                <span className="text-blue-400 font-bold text-lg">{skill.level}%</span>
                            </div>

                            {/* Decoración */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section3;