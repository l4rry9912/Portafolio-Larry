import './App.css';
import LiquidEther from "./components/LiquidEther";
import { useCallback, useState } from 'react';

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

        const cvUrl = '/imagenes/cv-larry-rodriguez.pdf';

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'cv-larry-rodriguez.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setLoading(false);
            setMessage('Curriculum descargado');
        }, 800);
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
            {/* Fondo animado */}
            <LiquidEther />

            {/* Contenido central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 w-full">
                <section className="min-h-screen flex flex-col justify-center items-center space-y-12">

                    <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0 max-w-6xl w-full text-center">

                        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl space-y-6">
                            <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center pt-10">
                                Soy desarrollador de software y me apasiona el mundo de la tecnología y la programación. Me gusta aprender y experimentar con nuevas herramientas que me permitan construir proyectos funcionales y seguir mejorando mis habilidades técnicas.
                            </h1>
                        </div>

                        {/* Imagen */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/imagenes/fotoLarry.jpeg"
                                alt="Foto Larry"
                                className="rounded-full shadow-2xl border-2 border-dashed border-gray-400 max-w-xs w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-transform transform hover:scale-105"
                            onClick={handleScroll}
                        >
                            Ver Proyectos
                        </button>

                        <button
                            className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-lg px-12 py-4 rounded-full transition-transform transform hover:scale-105"
                            onClick={handleDownloadCV}
                            disabled={loading}
                        >
                            {loading ? "Descargando..." : "Descargar CV"}
                        </button>
                    </div>

                    {/* Mensaje */}
                    {message && (
                        <p className="mt-4 text-green-400 font-semibold text-center">
                            {message}
                        </p>
                    )}
                </section>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
        </div>
    );
}

export default Section1;