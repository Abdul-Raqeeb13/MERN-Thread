import User from "../models/userModel.js";
import Post from "../models/postModel.js";


const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ message: "PostedBy and Text fields are required" })
        }

        const user = await User.findById(postedBy)
        if (!user) return res.status(400).json({ message: "User not found" })
        console.log(user._id);

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to create post" })
        }

        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({ message: "Post text must be less than 500 chracters" })
        }

        const newPost = new Post({ postedBy, text, img })
        await newPost.save()
        res.status(200).json({ message: "Post Created Successfully", newPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in crreatePost : ", error.message);
    }
}

export { createPost }