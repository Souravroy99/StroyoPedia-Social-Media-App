import Post from "../controllers/Post";
import User from "../models/User";

export const createPost = async(req, res) => {
    try{
        const { userId, description, picturePath } = req.body ;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            picturePath,
            description,
            likes: {},
            comments: [],
            userPicturePath: user.picturePath, // Profile Image
        })

        await newPost.save();

        const allPosts = await Post.find() ;

        res.status(201).json(allPosts);   // 201 ---> Create Something
    }
    catch(err) {
        res.status(409).json({ message: err.message});       
    }
}

/* READ */
export const getFeedPosts = async(req, res) => {
    try{
        const allPosts = await Post.find() ;
        res.status(200).json(allPosts);   // 200 ---> Successful request
    }
    catch(err){
        res.status(404).json({ message: err.message});       
    }
}

export const getUserPosts = async(req, res) => {
    try{
        const { userId } = req.params;

        // First Approach: This is inefficient, because it fetchs many unnecessary posts
        /*
            const allPosts = await Post.find();
            const userPosts = allPosts.filter((posts) => posts.userId.toString() === userId);
        */

        // OR
        // Second Approach
        const userPosts = await Post.find({ userId: userId });  // Here, should not => {_id: userId}

        res.status(200).json(userPosts);
    }
    catch(err){
        res.status(404).json({ message: err.message});       
    }
}


/* UPDATE */
export const likePost = async(req, res) => {
    try{
        const { idOfPost } = req.params;
        const { userId } = req.body;  // A user who likes/dislikes

        const post = await Post.findById( idOfPost );
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId) ;
        }
        else {
            post.likes.set(userId, true);
        }

        res.status(200).json();
    }
    catch(err){
        res.status(404).json({ message: err.message});       
    }
}
