import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {type User, addUser, deleteUser, getUsers, updateUser } from "../utils/api";

import UserCard from "./UserCard";
import UserModal from "./UserModal";

const UserManagerPro: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load users (GET)
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data); // demo limit
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Open modal to add/edit
  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setModalOpen(true);
  };

  // Save user
  const handleSave = async (name: string) => {
    if (!name.trim()) return alert("Name is required");
    setSaving(true);
    try {
      if (editing) {
       const editUser = await updateUser(editing.id, { name });
       setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)));
      } else {
        const newUser =  await addUser({ name });
        setUsers((prev) => [newUser, ...prev]);
      }
      setModalOpen(false);
      setEditing(null);
      await loadUsers();
    } catch (err: any) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete user
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Manager Pro</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add User
        </button>
        <button
          onClick={loadUsers}
          className="bg-gray-200 px-4 py-2 rounded-xl"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
        <AnimatePresence>
          {users.map((u) => (
            <motion.div
              key={u.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <UserCard user={u} onEdit={openEdit} onDelete={handleDelete} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <UserModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditing(null);
            }}
            onSave={handleSave}
            initialName={editing?.name}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagerPro;
