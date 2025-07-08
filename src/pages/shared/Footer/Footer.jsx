import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationLottie from '../../../assets/lotties/animation.json';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-25 mt-50 pb-5 relative z-10">
            {/* Call to Action */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-orange-500 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left rounded-2xl shadow-lg z-20">
                <div className='space-y-3'>
                    <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
                    <p className="text-sm">It only takes a few minutes to register your FREE Travolo account.</p>
                    <button className="mt-4 md:mt-0 bg-white text-black px-5 py-2 rounded hover:bg-gray-300 cursor-pointer transition">
                        OPEN AN ACCOUNT
                    </button>
                </div>
                <div>
                    <Lottie style={{width:'300px'}} animationData={animationLottie} loop={true}></Lottie>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 px-5">

                {/* Logo & Description */}
                <div>
                    <div className="flex items-center text-xl font-bold mb-4">
                        <span className="text-orange-500 text-3xl mr-2">🌍</span> Travolo
                    </div>
                    <p className="text-sm mb-4">Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo blandit aliquet.</p>
                    <div className="flex space-x-3 mt-4 text-lg">
                        <div className="p-2 border border-gray-500 rounded-full hover:border-orange-500 cursor-pointer">
                            <FaFacebookF className="hover:text-orange-500" />
                        </div>
                        <div className="p-2 border border-gray-500 rounded-full hover:border-orange-500 cursor-pointer">
                            <FaTwitter className="hover:text-orange-500" />
                        </div>
                        <div className="p-2 border border-gray-500 rounded-full hover:border-orange-500 cursor-pointer">
                            <FaInstagram className="hover:text-orange-500" />
                        </div>
                        <div className="p-2 border border-gray-500 rounded-full hover:border-orange-500 cursor-pointer">
                            <FaPinterestP className="hover:text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 relative">
                        Useful Links
                        <motion.span
                            className="absolute left-0 -bottom-1 h-1 w-6 bg-orange-500 rounded"
                            animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-orange-500 cursor-pointer">Home</li>
                        <li className="hover:text-orange-500 cursor-pointer">Destinations</li>
                        <li className="hover:text-orange-500 cursor-pointer">Pages</li>
                        <li className="hover:text-orange-500 cursor-pointer">Shop</li>
                        <li className="hover:text-orange-500 cursor-pointer">Blog</li>
                    </ul>
                </div>

                {/* Instagram Gallery */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 relative">
                        Our Instagram
                        <motion.span
                            className="absolute left-0 -bottom-1 h-1 w-6 bg-orange-500 rounded"
                            animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                            <div key={idx} className="w-full h-16 bg-gray-700"></div>
                        ))}
                    </div>
                </div>

                {/* Subscribe */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 relative">
                        Subscribe
                        <motion.span
                            className="absolute left-0 -bottom-1 h-1 w-6 bg-orange-500 rounded"
                            animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </h3>
                    <p className="text-sm mb-4">Subscribe to our newsletter for getting quick updates</p>
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="w-full px-3 py-2 mb-3 border border-gray-400 rounded focus:outline-orange-500 focus:ring-2 focus:ring-orange-500"
                    />
                    <button className=" bg-orange-500 px-5 py-2 rounded-xl hover:bg-orange-600 transition cursor-pointer">SUBSCRIBE</button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-10 pt-5 text-center text-xs">
                <p>
                    Copyright © 2025 <span className="text-orange-500">Travolo</span>. All Rights Reserved.
                    <span className="mx-2">|</span>
                    <span className="hover:text-orange-500 cursor-pointer">Privacy</span>
                    <span className="mx-1">|</span>
                    <span className="hover:text-orange-500 cursor-pointer">Terms & Conditions</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
