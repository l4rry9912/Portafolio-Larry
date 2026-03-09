import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { Zenitho } from 'uvcanvas';
import { PERSONAL_INFO } from '../lib/constants';

function Footer() {
    return (
        <footer id="contacto" className="relative text-white py-12 md:py-20 overflow-hidden">

            {/* Fondo animado */}
            <div className="absolute inset-0 -z-10 opacity-70">
                <Zenitho />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-16 rounded-3xl md:rounded-[3rem] p-6 md:p-16 backdrop-blur-3xl bg-black/40 border border-white/10 shadow-2xl">

                    {/* Contacto */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h5 className="text-xl md:text-2xl font-black mb-4 md:mb-8 text-blue-500">Contacto</h5>
                        <ul className="space-y-4 text-base md:text-lg">
                            <li>
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="flex items-center justify-center md:justify-start gap-3 hover:text-blue-400 transition-colors group"
                                >
                                    <FaEnvelope className="text-xl md:text-2xl flex-shrink-0" />
                                    <span className="break-all">{PERSONAL_INFO.email}</span>
                                </a>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3">
                                <FaPhone className="text-xl md:text-2xl flex-shrink-0" />
                                <span>{PERSONAL_INFO.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex flex-col items-center">
                        <h5 className="text-xl md:text-2xl font-black mb-4 md:mb-8 text-blue-500">Redes Sociales</h5>
                        <div className="flex gap-6 md:gap-8 text-3xl md:text-4xl">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-all transform hover:scale-110"
                                aria-label="Github"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href={PERSONAL_INFO.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-blue-500 transition-all transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={PERSONAL_INFO.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-pink-500 transition-all transform hover:scale-110"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Volver Arriba / Copyright */}
                    <div className="flex flex-col items-center md:items-end justify-center">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3.5 mb-6 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Volver Arriba
                        </button>
                        <div className="text-white/50 text-xs md:text-sm font-medium tracking-widest uppercase">
                            © {new Date().getFullYear()} {PERSONAL_INFO.name}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;