import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSubcategoriesByCategory } from '@/utils/api';

const SubMenus = () => {
  const router = useRouter();
  const { id } = router.query;
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (id) {
      
      const fetchSubcategories = async () => {
        try {
          const subcategories = await getSubcategoriesByCategory(id);
          setSubcategories(subcategories);
        //   console.log(subcategories)
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      fetchSubcategories();
    }
  }, [id]);

  return (
    <div className="px-7 pb-10">
      <h1 className="text-3xl text-center mb-6">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subcategories.map((sub) => (
          <div key={sub._id} className="p-4 bg-white shadow-md rounded-lg">
           
            <h2 className="text-xl font-semibold mb-2">{sub.name}</h2>
            <div className="bg-gray-200 h-32 w-full rounded mb-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubMenus;
