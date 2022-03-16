import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    isValidDate(input){
        return input instanceof Date && !isNaN(input);
    }

    static async addProject({ user_id, title, description, fromDate, toDate }){
        if( !user_id || !title || !description || !fromDate || !toDate ){
            const errorMessage = 
             "빠트린 항목이 있습니다. 모두 채워주세요.";
            return { errorMessage };
        }

        const fromDateCheck = new Date(fromDate);
        const toDateCheck = new Date(toDate);

        if(!isValidDate(fromDateCheck) || !isValidDate(toDateCheck)){
            const errorMessage = 
             "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
            return { errorMessage };
        }

        const query = {
            userId: user_id,
            title,
            description,
            fromDate,
            toDate,
        }
        
        const project = await Project.findByQuery(query);
        //학적 중복
        if(project){
            const errorMessage = 
             "중복된 학적입니다. 다른 학적을 입력해 주세요."
            return { errorMessage };
        }
        const id = uuidv4();
        const createdNewProject = await Project.create({ ...query, id});
        createdNewProject.errorMessage = null;
        
        
        return createdNewProject;
    }

    static async getProject({ project_id }){
        // db에서 찾지 못한 경우, null 반환 받음
        const project = await Project.findById({ project_id });

        if(!project){
            const errorMessage = 
             "해당 학적이 존재하지 않습니다.";
            return { errorMessage };
        }

        return Project;
    }

    static async setProject({ project_id, toUpdate }){
        // 우선 해당 id 의 학적이 db에 존재하는지 여부 확인
        let project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
        const errorMessage =
            "해당 학적이 존재하지 않습니다.";
        return { errorMessage };
        }

        // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.title) {
        const fieldToUpdate = "title";
        const newValue = toUpdate.title;
        Project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.description) {
        const fieldToUpdate = "description";
        const newValue = toUpdate.description;
        Project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.fromDate) {
        const fieldToUpdate = "fromDate";
        const newValue = toUpdate.fromDate;
        
        const newValueCheck = new Date(newValue);
        if(!isValidDate(newValueCheck)){
            const errorMessage =
                "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
            return { errorMessage };
        }
        Project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.toDate) {
        const fieldToUpdate = "toDate";
        const newValue = toUpdate.toDate;

        const newValueCheck = new Date(newValue);
        if(!isValidDate(newValueCheck)){
            const errorMessage =
                "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
            return { errorMessage };
        }
        Project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        return Project;
    }

    static async getProjectList({ user_id }){
        const projects = await Project.findAll();
        const filteredProjectList = projects
        .filter(({ userId }) => userId === user_id);
        
        if(filteredProjectList.length === 0){
            const errorMessage =
             "해당하는 project_id가 없어 Edulist를 줄 수 없습니다."
            return { errorMessage };
        }

        return filteredProjectList;
    }
}

export { projectService };