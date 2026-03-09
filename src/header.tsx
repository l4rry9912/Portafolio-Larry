import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Zenitho } from 'uvcanvas';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setVisible(scrollTop <= lastScrollTop);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header
            className="fixed left-0 right-0 flex justify-center mt-3 transition-top duration-500 z-50"
            style={{ top: visible ? '0' : '-200px' }}
        >
            <div className="relative rounded-full shadow-lg overflow-visible w-11/12 md:w-3/4 h-20 text-2xl">
                {/* Fondo animado */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <Zenitho />
                </div>

                {/* Contenido */}
                <div className="relative h-full flex justify-between items-center px-10">
                    {/* Logo / Nombre */}
                    <div>
                        <h1>Larry Rodriguez</h1>

                    </div>

                    {/* Menú */}
                    <div className="flex items-center">
                        {/* Menu Desktop */}
                        <ul className="hidden md:flex gap-6 text-gray-900 font-medium">
                            <li>
                                <a href="#sobremi" className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                >Sobre mí</a>
                            </li>
                            <li>
                                <a href="#habilidades" className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                >Habilidades</a>
                            </li>
                            <li>
                                <a href="#contacto" className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                >Contacto</a>
                            </li>
                        </ul>

                        {/* Hamburger */}
                        <FaBars
                            className="md:hidden text-gray-900 text-2xl ml-2 cursor-pointer"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                {/* Menu Mobile */}
                {menuOpen && (
                    <div
                        className="absolute top-20 left-0 w-full md:hidden p-1"
                        style={{ zIndex: 60 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden backdrop-blur-sm bg-gray-900 bg-opacity-50 shadow-lg px-2">
                            {/* Fondo animado */}
                            <div className="absolute inset-0">
                                <Zenitho />
                            </div>

                            {/* Contenido del menú */}
                            <ul className="relative space-y-2 text-center py-4">
                                <li>
                                    <a
                                        href="#sobremi"
                                        className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                    >
                                        Sobre mí
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#habilidades"
                                        className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                    >
                                        Habilidades
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contacto"
                                        className="text-black font-medium block border border-transparent rounded-full px-4 py-2 hover:border-black transition-all duration-300"
                                    >
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;