import { memo, useCallback } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { PERSONAL_INFO } from '@/lib/constants';
import {
  sectionBg,
  sectionContainer,
  accentText,
  textBody,
  textMuted,
  btnPrimary,
  iconLinkBtn,
} from '@/lib/sectionTheme';
import { smoothScrollToTop } from '@/lib/smoothScroll';

function Footer() {
  const handleBackToTop = useCallback(() => {
    smoothScrollToTop(740);
  }, []);

  return (
    <footer
      id="contacto"
      className={`${sectionBg} relative isolate scroll-mt-28 overflow-hidden py-12 md:scroll-mt-32 md:py-20`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(30,58,138,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(56,189,248,0.08),transparent)]"
        aria-hidden
      />

      <div className={`relative z-10 ${sectionContainer}`}>
        <div className="flex flex-col gap-10 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-3xl md:grid md:grid-cols-3 md:gap-16 md:rounded-[3rem] md:p-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h5 className={`mb-6 font-['Geist_Variable'] text-xl font-bold md:mb-8 md:text-2xl ${accentText}`}>
              Contacto
            </h5>
            <ul className="space-y-4 text-base md:text-lg">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className={`group flex cursor-pointer items-center justify-center gap-3 transition-colors duration-300 ease-out hover:text-sky-300 md:justify-start ${textBody}`}
                >
                  <FaEnvelope className="h-5 w-5 shrink-0 text-sky-400/90 transition group-hover:text-sky-300" />
                  <span className="break-all">{PERSONAL_INFO.email}</span>
                </a>
              </li>
              <li className={`flex items-center justify-center gap-3 md:justify-start ${textBody}`}>
                <FaPhone className="h-5 w-5 shrink-0 text-sky-400/90" />
                <span>{PERSONAL_INFO.phone}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h5 className={`mb-6 font-['Geist_Variable'] text-xl font-bold md:mb-8 md:text-2xl ${accentText}`}>
              Redes
            </h5>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkBtn}
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkBtn}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkBtn}
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center md:items-end">
            <button
              type="button"
              className={`scroll-cta ${btnPrimary} mb-6`}
              onClick={handleBackToTop}
            >
              Volver arriba
            </button>
            <div className={`text-xs font-medium uppercase tracking-widest ${textMuted}`}>
              © {new Date().getFullYear()} {PERSONAL_INFO.name}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
