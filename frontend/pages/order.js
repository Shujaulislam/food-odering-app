import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCart, removeCartItem } from '../utils/api';

const Order = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCart();
      setCartItems(items);
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    await removeCartItem(itemId);
    setCartItems(cartItems.filter(item => item._id !== itemId));
  };

  return (
    <div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map(item => (
              <div key={item._id} className="border p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p>{item.description}</p>
                <p className="text-lg font-bold">${item.price}</p>
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover"/>
                <button onClick={() => handleRemoveItem(item._id)} className="bg-red-500 text-white p-2 mt-2">Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Order;
