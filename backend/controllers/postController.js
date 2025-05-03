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

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id.toString())

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" })
        }

        res.status(200).json({ message: "Post Found", post })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in getPost  : ", error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete post" })
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Delete post success", post })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in deletepost  : ", error.message);
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post Not found" })
        }

        const userLikedPost = post.likes.includes(userId)
        if (userLikedPost) {
            // unlike post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            // like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post liked successfully" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in like and unlike post  : ", error.message);
    }
}

const replyToPost = async (req, res) => {
    try {

        const { text } = req.body;
        const { id: postId } = req.params;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) {
            res.status(400).json({ message: "Text field is required" })
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post Not found" })
        }

        const reply = { userId, text, userProfilePic, username };

        post.replies.push(reply)
        await post.save()

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error in reply to post  : ", error.message);
    }
}

const getFeedPost = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        console.log(user);
        
		const following = user.following;
        console.log(following);
        
		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPost }