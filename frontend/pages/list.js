import { useEffect, useState } from "react";
import {
  getFoods,
  addToCart,
  addToWishlist,
  removeFromCart,
  getAllCategories,
} from "@/utils/api"; // Import removeFromCart API function
import { IoCartOutline, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const foods = await getFoods();
      setFoods(foods);
    };

    fetchFoods();
  }, []);

 
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
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide the toast after 3 seconds
  };

  return (
    <>
      {toast.visible && (
        <div
          className={`fixed top-0 right-0 m-4 p-4 rounded ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}
      <section className="px-7 pb-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-center pt-4 gap-14 ">
        {foods.map((item) => (
          <div className="w-72 bg-white shadow-md rounded-xl hover:shadow-xl" key={item._id}>
          <Link href={`/cart_item/${item._id}`}>
            <img
            src={item.imageUrl}
            alt="Product"
             className="h-80 w-72 object-cover rounded-t-xl duration-500 hover:scale-[1.05]"
            />
          </Link>
            <div className="px-4 py-3 w-72">
              <p className="text-lg font-bold text-black truncate block capitalize">
                {item.name}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  ${item.price}
                </p>
                <div className="ml-auto flex items-center align-middle border bg-blue-300 text-white px-3 py-1 rounded-md space-x-2" onClick={() => handleAddToCart(item._id)}>
                  <button>Add Item</button>
                  <IoCartOutline />
                </div>
              </div>
          
            </div>
          </div>
        ))}
      </div>
    
      </section>
    </>
  );
};

export default Menu;
