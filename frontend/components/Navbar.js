import Link from 'next/link';
import { useState,useEffect } from 'react';
import { getCart } from '@/utils/api';
const Navbar = () => {
  const [cartItem, setCartItems] =useState([])
  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCart();
      setCartItems(items);
      console.log(setCartItems.length)
    };

    fetchCartItems();
  }, []);
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" passHref={true} legacyBehavior={true}>
            <a className="text-white">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/menu" passHref={true} legacyBehavior={true}>
            <a className="text-white">Menu</a>
          </Link>
        </li>
        <li>
          <Link href="/order" passHref={true} legacyBehavior={true}>
            <a className="text-white">Order</a>
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;