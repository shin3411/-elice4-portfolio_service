import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardServise";

const awardRouter = Router()

//생성
awardRouter.post("/award/create", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "body에 아무내용이 없습니다. 내용을 채워주세요"
            );
        }

        //user_id 받는 방식 변경 이제 바디에 user_id 넣지 않는 걸로
        const user_id = req.currentUserId
        const title = req.body.title
        const description = req.body.description

        const newAward = await AwardService.addAward({ user_id, title, description })

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage)
        }
        res.status(201).json(newAward)

    } catch (err) {
        next(err)
    }
})

//검색
awardRouter.get('/awards/search', login_required, async (req, res, next) => {
    try {
        const query = {}
        //한글 깨져서 오는것 decode
        if (req.query.title) {
            query.title = { $regex: decodeURIComponent(req.query.title) }
        }
        if (req.query.description) {
            query.description = { $regex: decodeURIComponent(req.query.description) }
        }
        if (!(query.title || query.description)) {
            throw new Error('쿼리를 정확하게 입력해 주세요.')
        }

        const result = await AwardService.getAwards(query)
        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }
        res.status(200).send(result)
    } catch (err) {
        next(err)
    }
})

//하나만 조회
awardRouter.get('/awards/:id', login_required, async (req, res, next) => {
    try {
        const _id = req.params.id
        const awardinfo = await AwardService.getAward({ _id })

        if (awardinfo.errorMessage) {
            throw new Error(awardinfo.errorMessage)
        }

        res.status(200).send(awardinfo)

    } catch (err) {
        next(err)
    }
})

//특정유저의 전체 수상내용 조회
awardRouter.get('/awardlist/:user_id', login_required, async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const awardlist = await AwardService.getAwards({ user_id });

        if (awardlist.errorMessage) {
            throw new Error(awardlist.errorMessage);
        }

        res.status(200).send(awardlist);

    } catch (error) {
        next(error);
    }
})

//수정
awardRouter.put('/awards/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 award의 id를 받아옴
        const awardId = req.params.id

        //body에서 업데이트할 정보 추출 널 병합 연산자 이용
        const title = req.body.title ?? null
        const description = req.body.description ?? null

        const toUpdate = { title, description }

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const updatedAward = await AwardService.setAwards({ toUpdate, awardId, currentUserId })

        if (updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }

        res.status(200).json(updatedAward);
    } catch (err) {
        next(err)
    }
})

//삭제
awardRouter.delete('/awards/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 award의 id를 받아옴
        const awardId = req.params.id

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const deletedAward = await AwardService.deleteAward({ awardId, currentUserId })

        if (deletedAward.errorMessage) {
            throw new Error(deletedAward.errorMessage);
        }

        res.status(200).json(deletedAward);
    } catch (err) {
        next(err)
    }
})

export { awardRouter }