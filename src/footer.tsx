import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { Zenitho } from 'uvcanvas';

function Footer() {
    return (
        <footer id="contacto" className="relative text-black py-16 overflow-hidden">

            {/* Fondo animado */}
            <div className="absolute inset-0 -z-10">
                <Zenitho />
            </div>

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-3 gap-12 rounded-3xl p-10 backdrop-blur-3xl">

                    {/* Contacto */}
                    <div className="flex flex-col items-center md:items-start">
                        <h5 className="text-2xl font-bold mb-4">Contacto</h5>
                        <ul className="space-y-3 text-xl">
                            <li>
                                <a
                                    href="mailto:larrysebastianrp@gmail.com"
                                    className="flex items-center gap-2 hover:text-cyan-400 transition"
                                >
                                    <FaEnvelope /> larrysebastianrp@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhone /> +34 674 65 83 22
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex flex-col items-center">
                        <h5 className="text-2xl font-bold mb-4">Redes Sociales</h5>
                        <div className="flex gap-6 text-3xl text-black">
                            <a
                                href="https://github.com/l4rry9912"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-transform transform hover:scale-125"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/larry-rodriguez-pati%C3%B1o-800430309/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-transform transform hover:scale-125"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://www.instagram.com/larry_rodriguez9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-transform transform hover:scale-125"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Volver Arriba / Copyright */}
                    <div className="flex flex-col items-center md:items-end">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-3 mb-4 transition-transform transform hover:scale-105"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Volver Arriba
                        </button>
                        <span className="text-gray-400 text-sm">© 2024 Larry Rodriguez</span>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;