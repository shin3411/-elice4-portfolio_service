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
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const user_id = req.body.user_id
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

//하나만 조회

//전체 조회

//수정

export { awardRouter }