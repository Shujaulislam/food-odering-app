import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const API_URL = 'http://localhost:5000/api';
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState('');
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAllcategories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
        showToast(`Error fetching categories: ${error.response?.status || error.message}`, 'error');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`${API_URL}/subcategories/${selectedCategory}`);
          setSubcategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories', error);
          showToast(`Error fetching subcategories: ${error.response?.status || error.message}`, 'error');
        }
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  const addCategory = async () => {
    try {
      await axios.post(`${API_URL}/addCategory`, { name: newCategoryName });
      setNewCategoryName('');
      const response = await axios.get(`${API_URL}/getAllcategories`);
      setCategories(response.data);
      showToast('Category added successfully', 'success');
    } catch (error) {
      console.error('Error adding category', error);
      showToast(`Error adding category: ${error.response?.status || error.message}`, 'error');
    }
  };

  const editCategory = async () => {
    try {
      await axios.post(`${API_URL}/editCategory/${editCategoryId}`, { name: editCategoryName });
      setEditCategoryId(null);
      setEditCategoryName('');
      const response = await axios.get(`${API_URL}/getAllcategories`);
      setCategories(response.data);
      showToast('Category edited successfully', 'success');
    } catch (error) {
      console.error('Error editing category', error);
      showToast(`Error editing category: ${error.response?.status || error.message}`, 'error');
    }
  };

  const removeCategory = async (id) => {
    try {
      await axios.post(`${API_URL}/removeCategory/${id}`);
      setSelectedCategory('');
      setSubcategories([]);
      const response = await axios.get(`${API_URL}/getAllcategories`);
      setCategories(response.data);
      showToast('Category removed successfully', 'success');
    } catch (error) {
      console.error('Error removing category', error);
      showToast(`Error removing category: ${error.response?.status || error.message}`, 'error');
    }
  };

  const addSubcategory = async () => {
    try {
      await axios.post(`${API_URL}/addSubcategory`, { name: newSubcategoryName, categoryId: selectedCategory });
      setNewSubcategoryName('');
      const response = await axios.get(`${API_URL}/subcategories/${selectedCategory}`);
      setSubcategories(response.data);
      showToast('Subcategory added successfully', 'success');
    } catch (error) {
      console.error('Error adding subcategory', error);
      showToast(`Error adding subcategory: ${error.response?.status || error.message}`, 'error');
    }
  };

  const editSubcategory = async () => {
    try {
      await axios.put(`${API_URL}/editSubcategory/${editSubcategoryId}`, { name: editSubcategoryName, categoryId: selectedCategory });
      setEditSubcategoryId(null);
      setEditSubcategoryName('');
      const response = await axios.get(`${API_URL}/subcategories/${selectedCategory}`);
      setSubcategories(response.data);
      showToast('Subcategory edited successfully', 'success');
    } catch (error) {
      console.error('Error editing subcategory', error);
      showToast(`Error editing subcategory: ${error.response?.status || error.message}`, 'error');
    }
  };

  const removeSubcategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/removeSubcategory/${id}`);
      const response = await axios.get(`${API_URL}/subcategories/${selectedCategory}`);
      setSubcategories(response.data);
      showToast('Subcategory removed successfully', 'success');
    } catch (error) {
      console.error('Error removing subcategory', error);
      showToast(`Error removing subcategory: ${error.response?.status || error.message}`, 'error');
    }
  };

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {toast.message}
        </div>
      )}
      
      <div className="flex">
        {/* Left Side: Categories */}
        <div className="w-1/2 p-4 border-r border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          {/* Add New Category */}
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border border-gray-300 p-2 rounded mb-2 w-full"
              placeholder="Category Name"
            />
            <button
              onClick={addCategory}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
          {/* Existing Categories */}
          <div>
            <h3 className="text-xl font-medium mb-2">Existing Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category._id} className="flex items-center justify-between mb-2 p-2 border border-gray-200 rounded">
                  {editCategoryId === category._id ? (
                    <>
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-3/4"
                      />
                      <button
                        onClick={editCategory}
                        className="bg-green-500 text-white py-1 px-2 rounded ml-2 hover:bg-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      {category.name}
                      <div>
                        <button
                          onClick={() => {
                            setEditCategoryId(category._id);
                            setEditCategoryName(category.name);
                          }}
                          className="bg-yellow-500 text-white py-1 px-2 rounded ml-2 hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeCategory(category._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-600"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => setSelectedCategory(category._id)}
                          className="bg-blue-500 text-white py-1 px-2 rounded ml-2 hover:bg-blue-600"
                        >
                          Manage Subcategories
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Subcategories */}
        <div className="w-1/2 p-4">
          {selectedCategory && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
              {/* Add New Subcategory */}
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Add New Subcategory</h3>
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  className="border border-gray-300 p-2 rounded mb-2 w-full"
                  placeholder="Subcategory Name"
                />
                <button
                  onClick={addSubcategory}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add Subcategory
                </button>
              </div>
              {/* Existing Subcategories */}
              <div>
                <h3 className="text-xl font-medium mb-2">Existing Subcategories</h3>
                <ul>
                  {subcategories.map(subcategory => (
                    <li key={subcategory._id} className="flex items-center justify-between mb-2 p-2 border border-gray-200 rounded">
                      {editSubcategoryId === subcategory._id ? (
                        <>
                          <input
                            type="text"
                            value={editSubcategoryName}
                            onChange={(e) => setEditSubcategoryName(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-3/4"
                          />
                          <button
                            onClick={editSubcategory}
                            className="bg-green-500 text-white py-1 px-2 rounded ml-2 hover:bg-green-600"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {subcategory.name}
                          <div>
                            <button
                              onClick={() => {
                                setEditSubcategoryId(subcategory._id);
                                setEditSubcategoryName(subcategory.name);
                              }}
                              className="bg-yellow-500 text-white py-1 px-2 rounded ml-2 hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeSubcategory(subcategory._id)}
                              className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
