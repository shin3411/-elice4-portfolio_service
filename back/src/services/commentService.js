import { Comment } from "../db";

class CommentService {
    //신규 댓글 추가
    static async addComment({ writerId, comment, userId }) {
        const createdNewComment = await Comment.create({ writerId, comment, userId })
        return createdNewComment
    }

    //특정 1개의 수상 정보 반환용
    static async getComment({ _id }) {

        const comment = await Comment.findById({ _id })
        if (comment.length == 0) {
            const errorMessage =
                "해당 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        return comment;
    }

    //특정 쿼리의 댓글 내역 반환용
    static async getComments(query) {
        const comments = await Comment.findByQuery(query)
        if (comments.length == 0) {
            const errorMessage =
                "해당 유저의 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        return comments;
    }

    //특정 1개의 댓글 수정
    static async setComments({ toUpdate, commentId, currentUserId }) {
        let comment = await Comment.findById({ _id: commentId })
        if (comment.writerId !== currentUserId) {
            const errorMessage = "권한이 없어 수정할 수 없습니다. 수정하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        }
        else {
            comment = await Comment.update({ commentId, toUpdate })
            return comment
        }
    }

    //특정 1개의 댓글 삭제
    static async deleteComment({ commentId, currentUserId }) {
        let comment = await Comment.findById({ _id: commentId })

        if (!comment) {
            const errorMessage =
                "해당 댓글이 존재하지 않습니다.";
            return { errorMessage };
        }

        if (comment.writerId !== currentUserId) {
            const errorMessage = "권한이 없어 삭제할 수 없습니다. 삭제하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        }
        comment = await Comment.delete({ commentId })

        return comment;
    }
}

export { CommentService }