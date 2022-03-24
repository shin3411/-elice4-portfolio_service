import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        writerId: {
            type: Schema.Types.ObjectId, required: true, ref: 'User'
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
