import { 
    FaHtml5, FaCss3Alt, FaJsSquare, FaReact, 
    FaBootstrap, FaJava, FaPhp, FaDatabase, FaAndroid 
} from 'react-icons/fa';

export const PERSONAL_INFO = {
    name: "Larry Rodriguez",
    email: "larrysebastianrp@gmail.com",
    phone: "+34 674 65 83 22",
    github: "https://github.com/l4rry9912",
    linkedin: "https://www.linkedin.com/in/larry-rodriguez-pati%C3%B1o-800430309/",
    instagram: "https://www.instagram.com/larry_rodriguez9/",
    cvUrl: "/imagenes/cv-larry-rodriguez.pdf",
};

export const PROJECTS = [
    {
        title: "My Agenda",
        images: [
            '/imagenes/MyAgenda1.png',
            '/imagenes/MyAgenda2.png',
            '/imagenes/MyAgenda3.png',
        ],
        description:
            "Mi Trabajo Final de Grado Superior realizado con Java, SQLite y Firebase en Android Studio. My Agenda es una aplicación que facilita la gestión de notas y calendarios integrando estas funcionalidades en una sola app. Permite la gestión de múltiples calendarios, notas y tareas. Además, ofrece la posibilidad de sincronizar los datos con Firebase para asegurar su disponibilidad en cualquier momento y lugar.",
        repoLink: "https://github.com/l4rry9912/MyAgenda",
        pdfLink: "/TFG_LarryRodriguez_DAM.docx.pdf",
    },
    {
        title: "GeneradorBase Universae",
        images: [
            '/imagenes/Generador1.png',
            '/imagenes/Generador2.png',
            '/imagenes/Generador3.png',
        ],
        description:
            "Aplicación de escritorio para cargar, modificar y guardar preguntas tipo test desde un archivo CSV, además incluye la funcionalidad para comprimir estas en un archivo ZIP. Desarrollada en Java y Swing con Ant, utilizando Java 8 y JDK 17 en ApacheNetbeans.",
        repoLink: "https://github.com/l4rry9912/GeneradorUniversae",
    },
    {
        title: "Launcher Universae",
        images: [
            '/imagenes/Launcher1.png',
            '/imagenes/Launcher2.png',
            '/imagenes/Launcher3.png',
        ],
        description:
            "Launcher a pantalla completa para lanzar simuladores educativos en ferias. Interfaz interactiva con miniaturas de grados y carrusel de imágenes de simuladores. Desarrollado con Java y Swing utilizando Java 8 y JDK 17 en ApacheNetbeans",
        repoLink: "https://github.com/lalovalls/LauncherUniversae",
    },
    {
        title: "WEB Universae",
        images: [
            '/imagenes/WebUniversae1.png',
            '/imagenes/WebUniversae2.png',
            '/imagenes/WebUniversae3.png',
        ],
        description:
            "Web para la demostración de simuladores educativos de Universae. Permite a los usuarios seleccionar y jugar diferentes simuladores. La plataforma está desarrollada en HTML, CSS y JavaScript.",
        repoLink: "https://github.com/lalovalls/WEB-UNIVERSAE",
    },
];

export const SKILLS = [
    { name: 'JavaScript', level: 80, icon: FaJsSquare, color: "text-yellow-400" },
    { name: 'Bootstrap', level: 80, icon: FaBootstrap, color: "text-purple-400" },
    { name: 'Java', level: 60, icon: FaJava, color: "text-red-400" },
    { name: 'HTML', level: 90, icon: FaHtml5, color: "text-orange-500" },
    { name: 'CSS', level: 90, icon: FaCss3Alt, color: "text-blue-500" },
    { name: 'React', level: 80, icon: FaReact, color: "text-cyan-400" },
    { name: 'PHP', level: 70, icon: FaPhp, color: "text-indigo-400" },
    { name: 'SQL', level: 60, icon: FaDatabase, color: "text-green-400" },
    { name: 'Android', level: 50, icon: FaAndroid, color: "text-green-400" }
];

export const EDUCATION = [
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

export const EXPERIENCE = [
    {
        company: 'High Education',
        position: 'Prácticas',
        period: '3 meses',
        description: 'Prácticas en desarrollo de software y web.'
    }
];

export const ABOUT_ME = `Soy estudiante de desarrollo de software. He finalizado el ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM) y actualmente estoy cursando Desarrollo de Aplicaciones Web (DAW), donde sigo ampliando mis conocimientos en programación y tecnologías web.
Me gusta aprender nuevas herramientas y enfrentarme a problemas de desarrollo que me ayuden a mejorar mis habilidades técnicas.
Mi objetivo es seguir creciendo como desarrollador, participando en proyectos que me permitan aplicar lo que aprendo y ganar experiencia práctica en el mundo del software.`;

export const OBJECTIVES = `Mis objetivos profesionales se centran en seguir formándome como desarrollador, mejorando mis habilidades en el desarrollo de software y especializándome en el desarrollo de aplicaciones web y multiplataforma. Me gustaría participar en proyectos reales que me permitan crecer técnica y profesionalmente mientras sigo aprendiendo nuevas tecnologías.`;
