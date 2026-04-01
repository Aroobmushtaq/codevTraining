
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Todo() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // ✅ Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  // 🔐 AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 📥 FETCH TODOS ONLY ON LOGIN
  const fetchTodos = async () => {
    if (!userId) return;

    setInitialLoading(true);
    const todosRef = collection(db, "users", userId, "todos");
    const snapshot = await getDocs(todosRef);

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTodos(items);
    setInitialLoading(false);
  };

  useEffect(() => {
    if (userId) fetchTodos();
    else {
      setTodos([]);
      setInitialLoading(false);
    }
  }, [userId]);

  // ➕ ADD / ✏ UPDATE
  const handleSave = async () => {
    if (!userId || !title.trim()) return;

    const todoData = { title, location, description };

    if (editId) {
      await updateDoc(doc(db, "users", userId, "todos", editId), todoData);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editId ? { ...todo, ...todoData } : todo))
      );
      setEditId(null);
    } else {
      const docRef = await addDoc(collection(db, "users", userId, "todos"), todoData);
      setTodos((prev) => [...prev, { id: docRef.id, ...todoData }]);
    }

    setTitle("");
    setLocation("");
    setDescription("");
  };

  // 🗑 DELETE MODAL
  const confirmDelete = (id) => {
    setDeleteTodoId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTodoId || !userId) return;

    setLoadingDelete(true);

    await deleteDoc(doc(db, "users", userId, "todos", deleteTodoId));

    setTodos((prev) => prev.filter((todo) => todo.id !== deleteTodoId));

    setLoadingDelete(false);
    setShowDeleteModal(false);
    setDeleteTodoId(null);
  };

  // ✏ EDIT TODO
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setLocation(todo.location);
    setDescription(todo.description);
  };

  if (authLoading || initialLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading todos...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">

      {!userId && <p className="text-center text-red-500 font-semibold">Please login or signup first to manage todos.</p>}

      {userId && (
        <>
          {/* INPUTS */}
          <div className="mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Todo Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-lg px-3 py-2" />
            </div>

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-lg px-4 py-3 text-lg w-full h-32 resize-none" />

            <div className="flex justify-center">
              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>

          {/* TODOS LIST */}
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos yet. Add your first todo.</p>
          ) : (
            <ul className="border rounded-lg overflow-hidden">
              <li className="grid grid-cols-6 bg-gray-100 font-semibold px-4 py-2">
                <span>#</span>
                <span>Todo</span>
                <span>Location</span>
                <span>Description</span>
                <span className="text-center">Edit</span>
                <span className="text-center">Delete</span>
              </li>

              {todos.map((todo, index) => (
                <li key={todo.id} className="grid grid-cols-6 px-4 py-2 border-t items-center hover:bg-green-50">
                  <span>{index + 1}</span>
                  <span className="break-words">{todo.title}</span>
                  <span className="break-words">{todo.location}</span>
                  <span className="break-words">{todo.description}</span>

                  <div className="text-center">
                    <button onClick={() => handleEdit(todo)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Edit</button>
                  </div>

                  <div className="text-center">
                    <button onClick={() => confirmDelete(todo.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-80 text-center">
                {loadingDelete ? (
                  <p className="text-blue-500 font-semibold">Deleting...</p>
                ) : (
                  <>
                    <p className="mb-4 font-semibold">Are you sure you want to delete this todo?</p>
                    <div className="flex justify-around">
                      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Yes, Delete</button>
                      <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Todo;
