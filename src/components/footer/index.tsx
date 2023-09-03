import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <footer className="py-2 text-xs flex items-center justify-between px-4 flex-col lg:flex-row gap-y-1">
      <div className="text-center">
        Copyright © {new Date().getFullYear()} All rights reserved
      </div>
      <div className="flex justify-center flex-col lg:flex-row gap-x-8">
        <div className="text-center">
          This template is made with ❤️ by Zehra
        </div>
        <div className="flex items-center justify-center flex-row gap-x-3">
          <a
            href="https://github.com/zehraikizler"
            target="_blank"
            className="flex items-center gap-1"
          >
            <AiFillGithub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/zehra-ikizler-831573208/"
            target="_blank"
            className="flex items-center gap-1"
          >
            <AiFillLinkedin />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
