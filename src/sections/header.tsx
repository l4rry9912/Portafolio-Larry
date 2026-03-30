import { useState, useEffect, memo } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { PERSONAL_INFO } from '@/lib/constants';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setVisible(scrollTop <= lastScrollTop || scrollTop < 50);
            setScrolled(scrollTop > 20);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        { name: 'Sobre mí', href: '#sobremi' },
        { name: 'Habilidades', href: '#habilidades' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <header
            className={`fixed left-0 right-0 flex justify-center transition-all duration-500 z-50 ${visible ? 'top-4 md:top-6' : '-top-32'}`}
        >
            <div className={`relative rounded-full shadow-2xl overflow-visible transition-all duration-300 ${scrolled ? 'w-11/12 md:w-[70%]' : 'w-11/12 md:w-3/4'} h-16 md:h-20 bg-black/30 backdrop-blur-md border border-white/10`}>
                {/* Contenido */}
                <div className="relative h-full flex justify-between items-center px-6 md:px-12">
                    {/* Logo / Nombre */}
                    <div className="flex items-center gap-2">
                        <h1 className="cursor-pointer font-black tracking-tighter text-white transition-colors hover:text-sky-300 text-xl md:text-2xl">
                            {PERSONAL_INFO.name.split(' ')[0]}<span className="text-sky-400">.</span>
                        </h1>
                    </div>

                    {/* Menú Desktop */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="cursor-pointer rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-white/80 transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/10 hover:text-white lg:text-base"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Menu Mobile */}
                <div
                    className={`absolute top-20 left-0 w-full md:hidden transition-all duration-500 transform ${menuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'}`}
                >
                    <div className="rounded-[2rem] overflow-hidden backdrop-blur-2xl bg-black/80 border border-white/10 shadow-2xl mx-2">
                        <ul className="flex flex-col text-center py-6 px-4 space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block cursor-pointer rounded-2xl border border-white/5 py-4 font-bold text-white/90 transition-all duration-300 ease-out hover:bg-sky-600 active:scale-95"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);

