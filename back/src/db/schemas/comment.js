import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        writerId: {
            type: String, required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }

);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
