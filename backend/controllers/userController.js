import User from "../models/UserModel.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  return res
    .status(200)
    .json({ id: user._id, name: user.name, email: user.email });
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.bio = req.body.bio ?? user.bio;
    user.phone = req.body.phone ?? user.phone;
    user.address = req.body.address ?? user.address;
    user.avatar = req.body.avatar ?? user.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
