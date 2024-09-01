import { useEffect, useState } from 'react';
import { getFoodById, addToCart } from '@/utils/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ItemPage = ({ id }) => {
  const [item, setItem] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const handleAddToCart = async (foodId) => {
    try {
      await addToCart(foodId);
      showToast("Item added to cart!", "success");
    } catch (error) {
      if (error.message === "Food item already in cart") {
        showToast("Item already in cart!", "error");
      } else {
        showToast("Failed to add item to cart!", "error");
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const food = await getFoodById(id);
        setItem(food);
      } catch (error) {
        console.error('Error fetching food item:', error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-100 to-pastel-200">
      {toast.visible && (
        <div className={`fixed top-4 right-4 m-4 p-4 rounded ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white z-50`}>
          {toast.message}
        </div>
      )}
      <nav className="bg-white shadow-md p-4">
        <Link href="/menu" className="text-blue-500 font-semibold">
          &larr; Back to Menu
        </Link>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <motion.img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full md:w-1/2 h-96 object-cover rounded-3xl shadow-xl"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{item.name}</h1>
            <p className="text-3xl font-semibold text-green-600 mb-6">${item.price.toFixed(2)}</p>
            <p className="text-xl text-gray-700 mb-8">{item.description}</p>
            <p className="text-xl text-gray-500 mb-8">{item.summary}</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToCart(item._id)}
              className="bg-blue-500 text-white py-4 px-8 rounded-full font-semibold text-xl shadow-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  return {  
    props: { id: slug },
  };
}

export default ItemPage;
