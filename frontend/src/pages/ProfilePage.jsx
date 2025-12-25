import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
    const { user } = useAuth;
  const [User, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          credentials: "include",
        });
        const data = await res.json();

        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // Update profile
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: User.name,
          email: User.email,
        }),
      });

      const data = await res.json();
      setUser(data);
      alert("Profile updated");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={submitHandler}>
        <h2>User Profile</h2>

        <div className="input-group">
          <label>User ID</label>
          <input type="text" value={user.id} disabled />
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={User.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={User.email}
            onChange={(e) =>
              setUser({ ...User, email: e.target.value })
            }
            required
          />
        </div>

        <button disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;


