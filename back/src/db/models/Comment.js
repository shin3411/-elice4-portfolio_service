import { CommentModel } from "../schemas/comment"

class Comment {
    static async create(newComment) {
        const createdNewComment = await CommentModel.create(newComment)
        //user 스키마 중에 password는 리턴되지 않게 해주려고 하던중에 궁금한게 생겼습니다.
        //몽구스에서 model.create는 프로미스를 반환하고 콘솔 찍어가면서 확인해봤는데 일반적인 객체가 아니라 몽구스 다큐먼트?? 같은 좀 다른거더라구요
        //그냥 객체인줄 알고 delete로 특정 키 지우려고 했는데 안되더라구요
        //model.find는 반환형이 쿼리여서 밑에처럼 뒤에 추가로 populate나 select를 달아줄수 있는데 model.create 프로미스를 반환하는거여서 이것도 안되네요
        //밑에처럼 구현하긴 했는데 더 좋은 방법이 있을까요?
        createdNewComment.writerId = createdNewComment.writerId._id
        return createdNewComment;
    }

    static async findById({ _id }) {
        const comment = await CommentModel.findOne({ _id: _id }).populate('writerId', '-password');
        return comment;
    }

    static async findByQuery(query) {
        const comments = await CommentModel.find(query).sort('-createdAt').populate('writerId', 'email id name -_id');
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