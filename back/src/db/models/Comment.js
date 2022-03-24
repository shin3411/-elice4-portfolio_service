import { CommentModel } from "../schemas/comment"

class Comment {
    static async create(newComment) {
        const createdNewComment = await CommentModel.create(newComment);
        return createdNewComment;
    }

    static async findById({ _id }) {
        const comment = await CommentModel.findOne({ _id: _id });
        return comment;
    }

    static async findByQuery(query) {
        const comments = await CommentModel.find(query).sort('-createdAt');
        return comments;
    }

    static async update({ commentId, toUpdate }) {
        const filter = { _id: commentId };
        const update = toUpdate;
        const option = { returnOriginal: false };

        const updatedComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedComment;
    }

    static async delete({ commentId }) {
        const ret = await CommentModel.findOneAndDelete({ _id: commentId })
        return ret
    }
}

export { Comment }