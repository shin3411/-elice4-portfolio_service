import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/commentService";
import { userAuthService } from '../services/userService'
const commentRouter = Router()

//생성
commentRouter.post('/comment/create', login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const writerId = await userAuthService.getUserInfo({ user_id: req.currentUserId })
        const comment = req.body.comment
        const userId = req.body.userId

        const newComment = await CommentService.addComment({ writerId, comment, userId })
        res.status(201).json(newComment)
    } catch (err) {
        next(err)
    }
})

//하나만 조회
commentRouter.get('/comments/:id', login_required, async (req, res, next) => {
    try {
        const _id = req.params.id
        const commentinfo = await CommentService.getComment({ _id })

        if (commentinfo.errorMessage) {
            throw new Error(commentinfo.errorMessage)
        }

        res.status(200).send(commentinfo)

    } catch (err) {
        next(err)
    }
})

//특정유저의 전체 댓글 조회
commentRouter.get('/commentlist/:user_id', login_required, async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const commentlist = await CommentService.getComments({ user_id });

        if (commentlist.errorMessage) {
            throw new Error(commentlist.errorMessage);
        }

        res.status(200).send(commentlist);

    } catch (error) {
        next(error);
    }
})

//수정
commentRouter.put('/comments/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 comment의 id를 받아옴
        const commentId = req.params.id

        const comment = req.body.comment
        const toUpdate = { comment }

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const updatedComment = await CommentService.setComments({ toUpdate, commentId, currentUserId })

        if (updatedComment.errorMessage) {
            throw new Error(updatedComment.errorMessage);
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        next(err)
    }
})

//삭제
commentRouter.delete('/comments/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 comment의 id를 받아옴
        const commentId = req.params.id

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const deletedComment = await CommentService.deleteComment({ commentId, currentUserId })

        if (deletedComment.errorMessage) {
            throw new Error(deletedComment.errorMessage);
        }

        res.status(200).json(deletedComment);
    } catch (err) {
        next(err)
    }
})

export { commentRouter }