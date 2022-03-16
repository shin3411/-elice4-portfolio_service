import { eduService } from "../services/educationService";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import is from "@sindresorhus/is";
const eduRouter = Router();

eduRouter.post('/education/create', login_required, async (req, res, next) => {
    try{
        if(!is.nonEmptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        const { user_id, school, major, position } = req.body;
        const newEdu = await eduService.addEdu({user_id, school, major, position});

        if(newEdu.errorMessage){
            throw new Error(newEdu.errorMessage);
        }
        console.log(newEdu);
        res.status(201).send(newEdu);

    } catch(err) {
        next(err);
    }
})

eduRouter.get('/educations/:id', login_required, async (req, res, next) => {
    try{
        const edu_id = req.params.id;
        const edu = await eduService.getEdu({ edu_id });

        if(edu.errorMessage){
            throw new Error(edu.errorMessage);
        }
        res.status(200).send(edu);

    } catch(err) {
        next(err);
    }
})

eduRouter.put('/educations/:id', login_required, async (req, res, next) => {
    try{
        if(!is.nonEmptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }
        
        // 참고로 req.body 가 { school: '학교', major: '전공' }이면,
        // position에 할당되는 값은 undefined 이다!
        const { school, major, position } = req.body; 
        const toUpdate = { school, major, position }; 
        const edu_id = req.params.id;
        const edu = await eduService.setEdu({ edu_id, toUpdate });

        if(edu.errorMessage){
            throw new Error(edu.errorMessage);
        }
        res.status(200).send(edu);

    } catch(err) {
        next(err);
    }
})

eduRouter.get('/educationlist/:user_id', login_required, async (req, res, next) => {
    try{
        const { user_id }= req.params;
        const eduList = await eduService.getEduList({ user_id });

        if(eduList?.errorMessage){
            throw new Error(eduList.errorMessage);
        }
        res.status(200).send(eduList);

    } catch(err) {
        next(err);
    }
})

export { eduRouter };