import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSerCookie.js";

const signupUser = async (req, res) => {
   try {
      const { name, username, email, password } = req.body
      const user = await User.findOne({ $or: [{ email }, { username }] })
      if (user) {
         return res.status(400).json({ error: "User already exist" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
         name,
         username,
         email,
         password: hashPassword
      })

      await newUser.save()

      if (newUser) {
         generateTokenAndSetCookie(newUser._id, res)
         res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            bio : newUser.bio,
            profilePic : newUser.profilePic

         })
      }
      else {
         res.status(400).json({ error: "Invalid user data" })
      }


   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in signupUser : ", error.message);

   }
}

const loginUser = async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

      if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" })
      generateTokenAndSetCookie(user._id, res)

      res.status(200).json({
         _id: user._id,
         username: user.username,
         name: user.name,
         email: user.email,
         bio : user.bio,
         profilePic : user.profilePic
      })

   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in loginUser : ", error.message);

   }
}

const logoutUser = async (req, res) => {
   try {
      res.cookie("jwt", "", { maxAge: 1 })
      res.status(200).json({ message: "User logged out successfully" })
   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in logoutUser : ", error.message);

   }
}

const followUnFollowUser = async (req, res) => {
   try {
      const { id } = req.params;
      const userToModify = await User.findById(id) // other user 
      const currentUser = await User.findById(req.user._id) // login user


      if (id == req.user._id.toString()) return res.status(400).json
         ({ error: "You cannot follow/unfollow yourself" })

      if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" })

      const isFollowing = currentUser.following.includes(id)

      if (isFollowing) {
         await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
         await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
         return res.status(200).json({ message: "User unfollow successfully" })
      }
      else {
         await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
         await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
         return res.status(200).json({ message: "User follow successfully" })

      }

   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in FollowUnFollowUser : ", error.message);

   }
}

const updateUser = async (req, res) => {
   try {
      const { name, username, email, password, profilePic, bio } = req.body
      const userId = req.user._id // login user
      let user = await User.findById(userId)

      if (req.params.id !== userId.toString()) return res.status(400).json({ error: "You can not update other user's profile" })
      if (!user) return res.status(400).json({ error: "User not found" })
      if (password) {
         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password, salt);
         user.password = hashPassword
      }

      user.name = name || user.name
      user.email = email || user.email
      user.username = username || user.username
      user.profilePic = profilePic || user.profilePic
      user.bio = bio || user.bio

      user = await user.save();
      res.status(200).json({ message: "Profile updated Successfully", user })
   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in updateUser : ", error.message);


   }
}

const getUserProfile = async (req, res) => {
   try {
      const {username} = req.params;
      const user = await User.findOne({username}).select("-password").select("-updatedAt")
      if(!user) return res.status(400).json({error : "User not found"})
      res.status(200).json(user)
   } catch (error) {
      res.status(500).json({ error: error.message })
      console.log("Error in getUserProfile : ", error.message);
   }
}
export { signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile }
