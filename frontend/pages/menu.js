import { useEffect, useState } from "react";
import { getFoods, getAllCategories } from "@/utils/api";
import Link from "next/link";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foods = await getFoods();
        setFoods(foods);
      } catch (error) {
        showToast(error.message, 'error');
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await getAllCategories();
        setCategories(category);
      } catch (error) {
        showToast(error.message, 'error');
      }
    };
    fetchCategories();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
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
        <h1 className="text-3xl text-center mb-6">Get Foods by Categories</h1>
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link href={`/items/${cat._id}`} key={cat._id} className="block">
                <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                  <div className="bg-gray-200 h-32 w-full rounded mb-2"></div>
                  <p className="text-gray-700">Explore all {cat.name} items</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Menu;
