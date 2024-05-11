import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="absolute top-0 left-0 w-full z-10 py-6 px-4 md:px-6 bg-[#121212] shadow-[0_0_12px_-5px_rgba(0,0,0,0.2)]">
    <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
      <Link
        className="text-[15px] md:text-[20px] text-white font-semibold"
        to="/"
      >
        <span className="md:text-[23px]">MY INVOICE</span>
      </Link>
      <nav>
        <div className="flex items-center gap-4 md:gap-8 text-white">
          <div className="h-full w-[40px] md:w-[90px] flex justify-center items-center">
            <span className="md:text-[18px] pl-6">Febrian</span>
          </div>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
