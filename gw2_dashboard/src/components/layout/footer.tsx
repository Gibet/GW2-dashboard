/* import { Cog, Contact, File, Github, Home, Info, Linkedin, Mail, MapPin } from "lucide-react"; */
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="textured-main backdrop-blur-xs w-full 2xl:max-w-[75vw] grid grid-cols-2 justify-center border-t items-start text-center pt-6 Lato">
      <div className="col-span-1 flex flex-col justify-self-center w-full px-4 items-start gap-2">
        <ul className="text-left w-full text-xs grid grid-cols-2 md:grid-cols-3 gap-3 text-nowrap">
          <li className="col-span-1">
            <a href="https://laguerre-jb.vercel.app/">
              <span>Portfolio</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-1 flex flex-col justify-self-center w-full px-4 items-start gap-2">
        <ul className="text-left text-xs grid grid-cols-1 gap-3">
          <li>
            <a href="https://github.com/Gibet/GW2-dashboard" target="_blank" rel="noopener noreferrer">
              {/* <Github size={14} strokeWidth={1} /> */}
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jean-bernard-laguerre/" target="_blank" rel="noopener noreferrer">
              {/* <Linkedin size={14} strokeWidth={1} /> */}
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="contact-info" className="col-span-2 sm:col-span-1  sm:col-start-2 grid grid-cols-1 gap-3 justify-self-center w-full px-4 pt-3 items-start gap-2 md:hidden text-xs text-left">
          <a href="mailto:laguerre.jb.dev@gmail.com" target="_blank" rel="noopener noreferrer">
            {/* <Mail size={14} strokeWidth={1} /> */}
            <span> laguerre.jb.dev@gmail.com</span>
          </a>
      </div>
      <span className="absolute bottom-4 right-8 text-xs opacity-50">
        © 2026 - Jean-Bernard Laguerre.
      </span>
    </footer>
  );
};

export default memo(Footer);
