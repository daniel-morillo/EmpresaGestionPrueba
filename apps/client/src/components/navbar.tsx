/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

const handleClick = (label: string) => {
    alert(`Clicked: ${label}`);
};

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="navbar bg-base-100 items-center justify-between px-4 md:px-8">
            <div className="text-2xl font-bold">
                <a className="btn btn-ghost normal-case text-xl">RRHH MANAGMENT</a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
                <a onClick={() => handleClick('Home')} className="btn btn-ghost text-lg">
                    Home
                </a>
                <a onClick={() => handleClick('Departments')} className="btn btn-ghost text-lg">
                    Departments
                </a>
                <a onClick={() => handleClick('Employees')} className="btn btn-ghost text-lg">
                    Employees
                </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    className="btn btn-ghost"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-base-100 shadow-lg">
                    <a onClick={() => handleClick('Home')} className="block px-4 py-2 text-lg hover:bg-base-200">
                        Home
                    </a>
                    <a onClick={() => handleClick('Departments')} className="block px-4 py-2 text-lg hover:bg-base-200">
                        Departments
                    </a>
                    <a onClick={() => handleClick('Employees')} className="block px-4 py-2 text-lg hover:bg-base-200">
                        Employees
                    </a>
                </div>
            )}
        </div>
    );
}
