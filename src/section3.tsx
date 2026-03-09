import { useInView } from 'react-intersection-observer';
import { 
    FaHtml5, FaCss3Alt, FaJsSquare, FaReact, 
    FaBootstrap, FaJava, FaPhp, FaDatabase, FaAndroid,  
} from 'react-icons/fa';

function Section3() {
    const skills = [
        { name: 'JavaScript', level: 80, icon: <FaJsSquare className="text-yellow-400 w-8 h-8"/> },
        { name: 'Bootstrap', level: 80, icon: <FaBootstrap className="text-purple-400 w-8 h-8"/> },
        { name: 'Java', level: 60, icon: <FaJava className="text-red-400 w-8 h-8"/> },
        { name: 'HTML', level: 90, icon: <FaHtml5 className="text-orange-500 w-8 h-8"/> },
        { name: 'CSS', level: 90, icon: <FaCss3Alt className="text-blue-500 w-8 h-8"/> },
        { name: 'React', level: 80, icon: <FaReact className="text-cyan-400 w-8 h-8"/> },
        { name: 'PHP', level: 70, icon: <FaPhp className="text-indigo-400 w-8 h-8"/> },
        { name: 'SQL', level: 60, icon: <FaDatabase className="text-green-400 w-8 h-8"/> },
        { name: 'Android', level: 50, icon: <FaAndroid className="text-green-400 w-8 h-8"/> }
    ];

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    return (
        <section 
            id="habilidades" 
            ref={ref} 
            className="py-16 bg-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                    Habilidades en Programación
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col"
                        >
                            {/* Icono + nombre */}
                            <div className="flex items-center gap-4 mb-4">
                                {skill.icon}
                                <h4 className="text-white text-xl font-semibold">{skill.name}</h4>
                            </div>

                            {/* Barra de progreso */}
                            <div className="w-full h-5 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                    className="h-5 bg-blue-600 rounded-full transition-all duration-2000 ease-in-out" 
                                    style={{ width: `${inView ? skill.level : 0}%` }}
                                ></div>
                            </div>

                            {/* Porcentaje */}
                            <span className="text-white mt-2 text-right font-semibold">{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section3;