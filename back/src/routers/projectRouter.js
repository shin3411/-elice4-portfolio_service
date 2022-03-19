import { projectService } from "../services/projectService";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import is from "@sindresorhus/is";
const projectRouter = Router();

projectRouter.post('/project/create', login_required, async (req, res, next) => {
    try{
        if(!is.nonEmptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        const user_id = req.currentUserId;
        const { title, description, from_date, to_date } = req.body;
        const newProject = await projectService.addProject({user_id, title, description, from_date, to_date });

        if(newProject.errorMessage){
            throw new Error(newProject.errorMessage);
        }
        
        res.status(201).send(newProject);

    } catch(err) {
        next(err);
    }
})

projectRouter.get('/projects/:id', login_required, async (req, res, next) => {
    try{
        const project_id = req.params.id;
        const project = await projectService.getProject({ project_id });
        
        if(project.errorMessage){
            throw new Error(project.errorMessage);
        }
        res.status(200).send(project);

    } catch(err) {
        next(err);
    }
})

projectRouter.put('/projects/:id', login_required, async (req, res, next) => {
    try{
        if(!is.nonEmptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }
        
        const project_id = req.params.id;        
        const projectCheck = await projectService.getProject({ project_id });
        if(projectCheck.userId !== req.currentUserId){
           throw new Error("다른 유저의 프로젝트를 수정할 수 없습니다!");
        }

        // 참고로 req.body 가 { title: '백엔드', description: 'node.js 프로젝트 수행했습니다.' }이면,
        // from_date, to_date에 할당되는 값은 undefined 이다!
        const { title, description, from_date, to_date } = req.body; 
        const toUpdate = { title, description, from_date, to_date }; 
        const project = await projectService.setProject({ project_id, toUpdate });

        if(project.errorMessage){
            throw new Error(project.errorMessage);
        }
        res.status(200).send(project);

    } catch(err) {
        next(err);
    }
})

projectRouter.get('/projectlist/:user_id', login_required, async (req, res, next) => {
    try{
        const { user_id }= req.params;
        const projectList = await projectService.getProjectList({ user_id });

        if(projectList?.errorMessage){
            throw new Error(projectList.errorMessage);
        }
        res.status(200).send(projectList);

    } catch(err) {
        next(err);
    }
})

projectRouter.delete('/projects/:id', login_required, async (req, res, next) => {
    try{
        const project_id = req.params.id;
        const project = await projectService.deleteProject({ project_id });
        
        if(project.errorMessage){
            throw new Error(project.errorMessage);
        }
        res.status(200).send(project);

    } catch(err) {
        next(err);
    }
})

export { projectRouter };