import mongoose from "mongoose";

const PostSchema = new mongoose({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    picturePath: {
        type: String,
    },
    description: {
        type: String,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
    userPicturePath: String,
}, 
{ 
    timestamps: true
}
);

const Post = mongoose.model("Post", PostSchema);
export default Post;