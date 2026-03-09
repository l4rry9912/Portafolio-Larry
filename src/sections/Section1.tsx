import { useCallback, useState } from 'react';
import LiquidEther from "../components/LiquidEther";
import { PERSONAL_INFO } from '../lib/constants';

function Section1() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleScroll = useCallback(() => {
        const section = document.getElementById('proyectos');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleDownloadCV = () => {
        setLoading(true);
        setMessage('');

        const link = document.createElement('a');
        link.href = PERSONAL_INFO.cvUrl;
        link.download = 'cv-larry-rodriguez.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            setLoading(false);
            setMessage('Curriculum descargado');
        }, 800);
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 py-20 px-4 overflow-hidden">
            {/* Fondo animado */}
            <div className="absolute inset-0 z-0">
                <LiquidEther />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center space-y-10 md:space-y-16 w-full max-w-6xl">

                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-12">
                    {/* Texto */}
                    <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-relaxed md:leading-extra-relaxed">
                            Soy desarrollador de software y me apasiona el mundo de la tecnología y la programación. Me gusta aprender y experimentar con nuevas herramientas que me permitan construir proyectos funcionales y seguir mejorando mis habilidades técnicas.
                        </h1>
                    </div>

                    {/* Foto */}
                    <div className="flex-shrink-0 order-1 md:order-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20"></div>
                            <img
                                src="/imagenes/fotoLarry.jpeg"
                                alt="Foto Larry Rodriguez"
                                className="relative rounded-full shadow-2xl border-4 border-gray-700 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <button
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                        onClick={handleScroll}
                    >
                        Ver Proyectos
                    </button>

                    <button
                        className="w-full sm:w-auto border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-lg px-10 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                        onClick={handleDownloadCV}
                        disabled={loading}
                    >
                        {loading ? "Descargando..." : "Descargar CV"}
                    </button>
                </div>

                {/* Mensaje */}
                {message && (
                    <p className="text-green-400 font-bold text-center animate-bounce">
                        {message}
                    </p>
                )}
            </div>

            {/* Gradiente inferior */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-0"></div>
        </section>
    );
}

export default Section1;