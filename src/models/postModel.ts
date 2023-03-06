import mongoose from "mongoose";

interface CommentI {
    text: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

interface PostI {
    text: string;
    author: mongoose.Types.ObjectId;
    comments: CommentI[]
}

interface NewPostI extends PostI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema<CommentI>({
    text: String,
    author: mongoose.SchemaTypes.ObjectId
},{
    timestamps: true
});

const postSchema = new mongoose.Schema<PostI>({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    comments: [commentSchema]
},{
    timestamps: true
});

const postModel = mongoose.model<NewPostI>("post", postSchema);

export default postModel;