import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="flex justify-around"
      >
        <Link href="/" className="hover:text-gray-400 transition duration-300">Home</Link>
        <Link href="/menu" className="hover:text-gray-400 transition duration-300">Menu</Link>
        <Link href="/order" className="hover:text-gray-400 transition duration-300">Order</Link>
      </motion.div>
      <div className="text-center mt-4">
        <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
