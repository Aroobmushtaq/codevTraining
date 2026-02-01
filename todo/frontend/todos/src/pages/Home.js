import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../components/Toast';
import { PencilIcon, TrashIcon, Plus, Flag, Calendar,AlertCircle } from 'lucide-react';
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    imageUrl: '',
    completed: false
  });
  const [modalImage, setModalImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      getTodo();
    }
  }, [token]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Cloudinary image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'todos_upload'); // <-- Replace with your preset

    setImageUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/djxmwzaw5/image/upload`, // <-- Replace with your cloud name
        data
      );
      setForm(prev => ({ ...prev, imageUrl: res.data.secure_url }));
      setImageUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUploading(false);
      Toast.error("Image upload failed!");
    }
  };

  // Create todo
  const createTodo = async () => {
    if (!form.title) return Toast.error("Title is required!");
    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      const response = await axios.post(
        'https://todo-backend--aroobmushtaq786.replit.app/todo/create',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Toast.success("Todo created successfully!", { autoClose: 3000 });
      console.log('Todo created:', response.data);
      await getTodo();
      // Reset form and close modal
      setForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        imageUrl: '',
        completed: false
      });
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error('Error creating todo:', error);
      Toast.error("Failed to create todo!", { autoClose: 3000 });
      setLoading(false);
    }
  };
  const getTodo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://todo-backend--aroobmushtaq786.replit.app/todo/get',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(response.data);
      console.log('Todos fetched:', response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  // Total todos
  const totalTodos = todos.length;

  // Completed todos
  const doneTodos = todos.filter(todo => todo.completed).length;

  // Active todos
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://todo-backend--aroobmushtaq786.replit.app/todo/delete/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Toast.success("Todo deleted successfully!", { autoClose: 3000 });
      console.log('Todo deleted:', id);
      await getTodo();
    }
    catch (error) {
      console.error('Error deleting todo:', error);
      Toast.error("Failed to delete todo!", { autoClose: 3000 });
    }
  };
  const updateTodo = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://todo-backend--aroobmushtaq786.replit.app/todo/update/' + id, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Toast.success("Todo updated successfully!", { autoClose: 3000 });
      console.log('Todo updated:', id);
      await getTodo();
      setIsModalOpen(false);
    }
    catch (error) {
      console.error('Error updating todo:', error);
      Toast.error("Failed to update todo!", { autoClose: 3000 });
    }
  };
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f5dbe6] to-[#e5dcef] text-center p-4">
        <AlertCircle className="w-10 h-10 text-pink-500 mb-4" />
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Please Login First</h2>
        </div>
        );}
  return (
    <div className="bg-gradient-to-r from-[#f5dbe6] to-[#e5dcef] min-h-screen p-4 flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-3xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-pink-50 rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-pink-600">
              {totalTodos}
            </div>
            <div className="text-xs text-gray-500">
              Total
            </div>
          </div>

          <div className="bg-green-100 rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">
              {doneTodos}
            </div>
            <div className="text-xs text-gray-500">
              Done
            </div>
          </div>

          <div className="bg-yellow-100 rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-yellow-800">
              {activeTodos}
            </div>
            <div className="text-xs text-gray-500">
              Active
            </div>
          </div>

        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className=" bg-gradient-to-r from-[#f5a3c7] to-[#e36ec2] border border-pink-200  hover:bg-pink-100 px-4 py-2 rounded-md transition"
      >
        <Plus className="inline-block w-5 h-5 mr-2  " />
        Add Todo
      </button>
      <div className="w-full max-w-3xl mt-6 grid gap-4">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-300 border-t-transparent mx-auto mb-3"></div>
            <p className="text-gray-500">Loading todos...</p>
          </div>
        ) : todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="group bg-white p-4 rounded-xl shadow flex gap-4 relative border border-pink-500 "
            >
              {/* Hover icons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <PencilIcon className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => {
                  setEditingTodo(todo);
                  setForm({
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate?.slice(0, 10),
                    priority: todo.priority,
                    imageUrl: todo.imageUrl || '',
                    completed: todo.completed
                  });
                  setIsModalOpen(true);
                }}
                />
                <TrashIcon className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => deleteTodo(todo._id)} />
              </div>

              {todo.imageUrl && (
                <img
                  src={todo.imageUrl}
                  alt="todo"
                  className="w-20 h-20 rounded object-cover"
                  onClick={() => setModalImage(todo.imageUrl)}
                />
              )}

              <div className="flex-1">
                <h3 className={`font-bold text-lg ${todo.completed ? "line-through" : ""
                  }`}>{todo.title}</h3>
                <p className="text-sm text-gray-600">{todo.description}</p>

                <div className="flex gap-3 mt-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded inline-flex items-center text-sm border
    ${todo.priority === "High"
                        ? "bg-red-100 text-red-700 border-red-400"
                        : todo.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }
  `}
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    {todo.priority}
                  </span>

                  {todo.completed && (
                    <span className="px-2 py-1 rounded bg-green-100 text-green-600">
                      Completed

                    </span>
                  )}
                </div>

                {todo.dueDate && (
                  <p className="text-xs text-gray-400 mt-1">
                    <Calendar className="w-3 h-3 inline-block mr-1" />
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded mb-2"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded mb-2"
            />

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {/* Image Upload */}
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full mb-2"
              accept="image/*"
            />
            {imageUploading && <p className="text-sm text-gray-500">Uploading image...</p>}
            {form.imageUrl && (
              <img src={form.imageUrl} alt="preview" className="w-32 h-32 object-cover mb-2 rounded" />
            )}

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="completed"
                checked={form.completed}
                onChange={handleChange}
              />
              Completed
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTodo(null);
                  setForm({
                    title: '',
                    description: '',
                    dueDate: '',
                    priority: 'Low',
                    imageUrl: '',
                    completed: false
                  });
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              {/* <button
                onClick={async () => {
                  if (editingTodo) {
                    await updateTodo(editingTodo._id, form);

                    setIsModalOpen(false);     // ✅ CLOSE MODAL
                    setEditingTodo(null);      // ✅ RESET EDIT MODE
                    setForm({                 // ✅ CLEAR FORM
                      title: '',
                      description: '',
                      dueDate: '',
                      priority: 'Low',
                      imageUrl: '',
                      completed: false
                    });
                  } else {
                    createTodo();
                  }
                }}

                disabled={imageUploading}
                className={`px-4 py-2 rounded text-white transition ${imageUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
                  }`}
              >
                {imageUploading
                  ? 'Uploading Image...'
                  : editingTodo
                    ? 'Update'
                    : 'Add'}

              </button> */}
              <button
                onClick={async () => {
                  if (editingTodo) {
                    await updateTodo(editingTodo._id, form);
                  } else {
                    createTodo();
                  }
                }}
                disabled={loading || imageUploading}
                className={`px-4 py-2 rounded text-white transition ${loading || imageUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-500 hover:bg-pink-600'
                  }`}
              >
                {loading
                  ? editingTodo ? 'Updating...' : 'Adding...'
                  : imageUploading
                    ? 'Uploading Image...'
                    : editingTodo
                      ? 'Update'
                      : 'Add'}
              </button>

            </div>
          </div>
        </div>
      )}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full view"
            className="w-96 h-96 object-contain rounded-lg shadow-lg"
          />
        </div>
      )}

    </div>
  );
}

export default Home;
