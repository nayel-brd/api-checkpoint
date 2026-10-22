import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [openUserId, setOpenUserId] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="status">Loading users...</p>;
  }

  if (error) {
    return <p className="status error">Error: {error}</p>;
  }

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const toggleUser = (id) => {
    setOpenUserId((current) => (current === id ? null : id));
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p className="status">No users found</p>
      ) : (
        <ul className="user-list">
          {filteredUsers.map((user) => {
            const isOpen = openUserId === user.id;
            return (
              <li key={user.id} className="user-card">
                <button className="user-header" onClick={() => toggleUser(user.id)}>
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                  <span className="user-company">{user.company.name}</span>
                </button>

                {isOpen && (
                  <div className="user-details">
                    <p>
                      <strong>Address:</strong> {user.address.street}, {user.address.suite},{" "}
                      {user.address.city} ({user.address.zipcode})
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>Website:</strong> {user.website}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UserList;
