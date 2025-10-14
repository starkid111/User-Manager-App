import "./App.css";

import { useEffect, useState } from "react";

import { addUsers, deleteUser, fetchUsers, type User } from "./utils/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser: User = {
      name: name,
      username: "newuser",
      email: "",
      phone: "",
      website: "",
    };

    try {
      const addedUser = await addUsers(newUser);
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      setName("");
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div>
        <h1>User Manager App</h1>
        <div>
          {users.map((user) => {
            return (
              <div
                key={user.id}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>{user.name}</span>
                <button onClick={() => handleDeleteUser(user.id!)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleAddUser}>add User</button>
        </div>
      </div>
    </>
  );
}

export default App;
