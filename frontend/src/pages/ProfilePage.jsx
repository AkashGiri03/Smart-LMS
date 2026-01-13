import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, setUser: setAuthUser } = useAuth(); // ❗ you forgot to CALL useAuth()
  const token = localStorage.getItem("token");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch profile
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        address: user.address || "",
      });

      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  // 🔹 Update profile

  const uploadAvatar = async () => {
    if (!avatarFile) return user.avatar;

    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("type", "avatar");

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/upload/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    return data.url; // THIS is avatarUrl
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let avatarUrl = user.avatar;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(); // this must return the Cloudinary URL
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            bio: form.bio,
            phone: form.phone,
            address: form.address,
            avatar: avatarUrl,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      // 👇 RIGHT HERE
      const updatedUser = await res.json();

      const newUser = { ...user, ...updatedUser };
      setAuthUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "700px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="mb-4">Profile Settings</h3>

        <form onSubmit={submitHandler}>
          {/* Avatar */}
          {/* Avatar Upload */}
          <div className="text-center mb-4">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="avatar"
              className="rounded-circle mb-2"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email (read-only) */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={form.email} disabled />
          </div>

          {/* Bio */}
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
