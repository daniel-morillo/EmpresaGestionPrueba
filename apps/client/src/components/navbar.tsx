import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMenuOpen(false); // Cierra el menú en dispositivos móviles
    };

    return (
        <div className="navbar bg-base-100 items-center justify-between px-4 md:px-8">
            <div className="text-2xl font-bold">
                <a onClick={() => handleNavigation('/')} className="btn btn-ghost normal-case text-xl">
                    RRHH MANAGEMENT
                </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
                <a onClick={() => handleNavigation('/')} className="btn btn-ghost text-lg">
                    Home
                </a>
                <a onClick={() => handleNavigation('/departments')} className="btn btn-ghost text-lg">
                    Departments
                </a>
                <a onClick={() => handleNavigation('/employees')} className="btn btn-ghost text-lg">
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
                    <a onClick={() => handleNavigation('/departments')} className="block px-4 py-2 text-lg hover:bg-base-200">
                        Departments
                    </a>
                    <a onClick={() => handleNavigation('/employees')} className="block px-4 py-2 text-lg hover:bg-base-200">
                        Employees
                    </a>
                </div>
            )}
        </div>
    );
}
