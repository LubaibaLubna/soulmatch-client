import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationLottie from '../../../assets/lotties/animation.json';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-32 mt-32 pb-5 relative z-10 font-body">
      {/* Call to Action */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4 bg-pink-600 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left rounded-2xl shadow-lg z-20">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Ready to find your soulmate?</h2>
          <p className="text-sm md:text-base">Join SoulMatch and take the first step toward your forever.</p>
          <button className="mt-2 bg-white text-pink-600 px-5 py-2 rounded-full hover:bg-gray-200 transition">
            Create Your Profile
          </button>
        </div>
        <div className="mt-6 md:mt-0">
          <Lottie style={{ width: '300px' }} animationData={animationLottie} loop={true} />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 px-5 text-gray-700">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center text-xl font-bold mb-4">
            <span className="text-pink-600 text-3xl mr-2">💖</span> <span className="font-heading text-gray-800">SoulMatch</span>
          </div>
          <p className="text-sm mb-4">SoulMatch helps you connect with compatible life partners in a safe, meaningful way.</p>
          <div className="flex space-x-3 mt-4 text-lg">
            {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP].map((Icon, idx) => (
              <div key={idx} className="p-2 border border-gray-500 rounded-full hover:border-pink-600 cursor-pointer">
                <Icon className="hover:text-pink-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 relative">
            Useful Links
            <motion.span
              className="absolute left-0 -bottom-1 h-1 w-6 bg-pink-600 rounded"
              animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-600 cursor-pointer">Home</li>
            <li className="hover:text-pink-600 cursor-pointer">Biodatas</li>
            <li className="hover:text-pink-600 cursor-pointer">About Us</li>
            <li className="hover:text-pink-600 cursor-pointer">Contact</li>
            <li className="hover:text-pink-600 cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Instagram Gallery Placeholder */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 relative">
            From Our Gallery
            <motion.span
              className="absolute left-0 -bottom-1 h-1 w-6 bg-pink-600 rounded"
              animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div key={idx} className="w-full h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 relative">
            Subscribe
            <motion.span
              className="absolute left-0 -bottom-1 h-1 w-6 bg-pink-600 rounded"
              animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </h3>
          <p className="text-sm mb-4">Get updates, tips, and new matches right in your inbox.</p>
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full px-3 py-2 mb-3 border border-gray-400 rounded focus:outline-pink-600 focus:ring-2 focus:ring-pink-600"
          />
          <button className="bg-pink-600 px-5 py-2 rounded-xl hover:bg-pink-700 transition cursor-pointer text-white">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-gray-500 border-gray-700 mt-10 pt-5 text-center text-xs">
        <p>
          © 2025 <span className="text-pink-600">SoulMatch</span>. All Rights Reserved.
          <span className="mx-2">|</span>
          <span className="hover:text-pink-600 cursor-pointer">Privacy Policy</span>
          <span className="mx-1">|</span>
          <span className="hover:text-pink-600 cursor-pointer">Terms & Conditions</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
