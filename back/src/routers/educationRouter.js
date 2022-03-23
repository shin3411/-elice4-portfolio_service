import { eduService } from "../services/educationService";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import is from "@sindresorhus/is";
const eduRouter = Router();

eduRouter.post('/education/create', login_required, async (req, res, next) => {
    try {
        if (!is.nonEmptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        const user_id = req.currentUserId;
        const { school, major, position } = req.body;
        const newEdu = await eduService.addEdu({ user_id, school, major, position });

        if (newEdu.errorMessage) {
            throw new Error(newEdu.errorMessage);
        }

        res.status(201).send(newEdu);

    } catch (err) {
        next(err);
    }
})

//검색
eduRouter.get('/educations/search', login_required, async (req, res, next) => {
    try {
        const query = {}
        //한글 깨져서 오는것 decode
        if (req.query.school) {
            query.school = { $regex: decodeURIComponent(req.query.school) }
        }
        if (req.query.major) {
            query.major = { $regex: decodeURIComponent(req.query.major) }
        }
        if (req.query.position) {
            query.position = { $regex: decodeURIComponent(req.query.position) }
        }

        if (!(query.school || query.major || query.position)) {
            throw new Error('쿼리를 정확하게 입력해 주세요.')
        }

        const edu = await eduService.searchEdu(query);

        res.status(200).send(edu);

    } catch (err) {
        next(err);
    }
})

eduRouter.get('/educations/:id', login_required, async (req, res, next) => {
    try {
        const edu_id = req.params.id;
        const edu = await eduService.getEdu({ edu_id });

        if (edu.errorMessage) {
            throw new Error(edu.errorMessage);
        }
        res.status(200).send(edu);

    } catch (err) {
        next(err);
    }
})

eduRouter.put('/educations/:id', login_required, async (req, res, next) => {
    try {
        if (!is.nonEmptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        const edu_id = req.params.id;
        const eduCheck = await eduService.getEdu({ edu_id });
        if (eduCheck.userId !== req.currentUserId) {
            throw new Error("다른 유저의 학적을 수정할 수 없습니다!");
        }

        // 참고로 req.body 가 { school: '학교', major: '전공' }이면,
        // position에 할당되는 값은 undefined 이다!
        const { school, major, position } = req.body;
        const toUpdate = { school, major, position };
        const edu = await eduService.setEdu({ edu_id, toUpdate });

        if (edu.errorMessage) {
            throw new Error(edu.errorMessage);
        }
        res.status(200).send(edu);

    } catch (err) {
        next(err);
    }
})

eduRouter.get('/educationlist/:user_id', login_required, async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const eduList = await eduService.getEduList({ user_id });

        if (eduList?.errorMessage) {
            throw new Error(eduList.errorMessage);
        }
        res.status(200).send(eduList);

    } catch (err) {
        next(err);
    }
})

eduRouter.delete('/educations/:id', login_required, async (req, res, next) => {
    try {
        const edu_id = req.params.id;
        const edu = await eduService.deleteEdu({ edu_id });

        if (edu.errorMessage) {
            throw new Error(edu.errorMessage);
        }
        res.status(200).send(edu);

    } catch (err) {
        next(err);
    }
})

export { eduRouter };