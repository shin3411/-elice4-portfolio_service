import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/CertificateService";

const certificateRouter = Router()

//생성
certificateRouter.post("/certificate/create", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        //생각해보니까 login_required 거치니까 body로 user_id 받지 않아도됨
        const user_id = req.currentUserId
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date

        const newCertificate = await CertificateService.addCertificate({ user_id, title, description, date })

        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage)
        }
        res.status(201).json(newCertificate)

    } catch (err) {
        next(err)
    }
})

//하나만 조회
certificateRouter.get('/certificates/:id', login_required, async (req, res, next) => {
    try {
        const _id = req.params.id
        const certificateinfo = await CertificateService.getCertificate({ _id })

        if (certificateinfo.errorMessage) {
            throw new Error(certificateinfo.errorMessage)
        }

        res.status(200).send(certificateinfo)

    } catch (err) {
        next(err)
    }
})

//특정유저의 전체 수상내용 조회
certificateRouter.get('/certificatelist/:user_id', login_required, async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const certificatelist = await CertificateService.getCertificates({ user_id });

        if (certificatelist.errorMessage) {
            throw new Error(certificatelist.errorMessage);
        }

        res.status(200).send(certificatelist);

    } catch (error) {
        next(error);
    }
})

//수정
certificateRouter.put('/certificates/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 certificate의 id를 받아옴
        const certificateId = req.params.id

        //body에서 업데이트할 정보 추출 널 병합 연산자 이용
        const title = req.body.title ?? null
        const description = req.body.description ?? null
        const date = req.body.date ?? null

        const toUpdate = { title, description, date }

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const updatedCertificate = await CertificateService.setCertificates({ toUpdate, certificateId, currentUserId })

        if (updatedCertificate.errorMessage) {
            throw new Error(updatedCertificate.errorMessage);
        }

        res.status(200).json(updatedCertificate);
    } catch (err) {
        next(err)
    }
})

//삭제
certificateRouter.delete('/certificates/:id', login_required, async (req, res, next) => {
    try {
        //URI에서 수정할 certificate의 id를 받아옴
        const certificateId = req.params.id

        //현재 요청준 로그인된 사용자의 아이디
        const currentUserId = req.currentUserId

        const deletedCertificate = await CertificateService.deleteCertificate({ certificateId, currentUserId })

        if (deletedCertificate.errorMessage) {
            throw new Error(deletedCertificate.errorMessage);
        }

        res.status(200).json(deletedCertificate);
    } catch (err) {
        next(err)
    }
})

export { certificateRouter }
