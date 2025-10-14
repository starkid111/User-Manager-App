import "./App.css";

import { useEffect, useState } from "react";

import { fetchUsers, type User } from "./utils/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

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
              <div key={user.id}>
                {user.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
