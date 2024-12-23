import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-8 mb-0"> {/* Increased padding and removed bottom margin */}
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} AI Trip Generator. All rights reserved.</p>
                <ul className="flex justify-center space-x-6 mt-4">
                    <li><a href="#" className="hover:text-gray-400">Home</a></li>
                    <li><a href="#" className="hover:text-gray-400">About</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                    <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                </ul>
                <div className="mt-4 space-x-4">
                    <a href="#" aria-label="Facebook" className="hover:text-gray-400">Facebook</a>
                    <a href="#" aria-label="Twitter" className="hover:text-gray-400">Twitter</a>
                    <a href="#" aria-label="Instagram" className="hover:text-gray-400">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
