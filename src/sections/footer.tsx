import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { Zenitho } from 'uvcanvas';
import { PERSONAL_INFO } from '../lib/constants';

function Footer() {
    return (
        <footer id="contacto" className="relative text-white py-20 overflow-hidden mt-10">

            {/* Fondo animado (Optimizado) */}
            <div className="absolute inset-0 -z-10 opacity-70">
                <Zenitho />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-16 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl bg-black/40 border border-white/10 shadow-2xl">

                    {/* Contacto */}
                    <div className="flex flex-col items-center md:items-start">
                        <h5 className="text-2xl font-black mb-8 tracking-tight text-blue-500">Contacto</h5>
                        <ul className="space-y-5 text-lg md:text-xl">
                            <li>
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="flex items-center gap-3 hover:text-blue-400 transition-colors group"
                                >
                                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                                        <FaEnvelope />
                                    </div>
                                    <span className="break-all">{PERSONAL_INFO.email}</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-600/20 transition-colors">
                                    <FaPhone />
                                </div>
                                <span>{PERSONAL_INFO.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex flex-col items-center">
                        <h5 className="text-2xl font-black mb-8 tracking-tight text-blue-500">Redes Sociales</h5>
                        <div className="flex gap-8 text-4xl">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-all transform hover:scale-125 hover:-translate-y-2 drop-shadow-lg"
                                aria-label="Github"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href={PERSONAL_INFO.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-blue-500 transition-all transform hover:scale-125 hover:-translate-y-2 drop-shadow-lg"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={PERSONAL_INFO.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-pink-500 transition-all transform hover:scale-125 hover:-translate-y-2 drop-shadow-lg"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Volver Arriba / Copyright */}
                    <div className="flex flex-col items-center md:items-end justify-center md:justify-start">
                        <button
                            className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full px-10 py-5 transition-all transform hover:scale-105 active:scale-95 shadow-xl mb-8"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <span className="relative z-10">Volver Arriba</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        <div className="text-white/50 text-sm font-medium tracking-widest uppercase">
                            © {new Date().getFullYear()} {PERSONAL_INFO.name}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;