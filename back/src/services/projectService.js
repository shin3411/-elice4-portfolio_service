import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";


class projectService {
    static isValidDate(input){
        return input instanceof Date && !isNaN(input);
    }
    
    static dateToString(dateObj){
        const fullYear = String(dateObj.getFullYear());
        const month = String(dateObj.getMonth() + 1);
        const date = String(dateObj.getDate());
        
        const dateString = `${fullYear.padStart(4,'0')}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`
        return dateString;
    }

    static refineDateFields(project){
        const { fromDate, toDate } = project;
        const fromDateString = projectService.dateToString(fromDate);
        const toDateString = projectService.dateToString(toDate);

        project.fromDate = fromDateString;
        project.toDate = toDateString;
        
        return project;
    }

    static async addProject({ user_id, title, description, from_date, to_date }){
        if( !user_id || !title || !description || !from_date || !to_date ){
            const errorMessage = 
             "빠트린 항목이 있습니다. 모두 채워주세요.";
            return { errorMessage };
        }

        const fromDateCheck = new Date(from_date);
        const toDateCheck = new Date(to_date);


        if(!projectService.isValidDate(fromDateCheck) || !projectService.isValidDate(toDateCheck)){
            const errorMessage = 
             "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
            return { errorMessage };
        }

        
        const query = {
            userId: user_id,
            title,
            description,
            fromDate: new Date(from_date),
            toDate: new Date(to_date),
        }
        
        const project = await Project.findByQuery(query);
        //프로젝트 중복
        if(project){
            const errorMessage = 
             "중복된 프로젝트입니다. 다른 프로젝트를 입력해 주세요."
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
             "해당 프로젝트가 존재하지 않습니다.";
            return { errorMessage };
        }

        const modifiedProject = projectService.refineDateFields(project);
        return modifiedProject;
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

        if (toUpdate.from_date) {        
            const from_date = new Date(toUpdate.from_date);
            if(!projectService.isValidDate(from_date)){
                const errorMessage =
                    "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
                return { errorMessage };
            }
        }

        if (toUpdate.to_date) {        
            const to_date = new Date(toUpdate.to_date);
            if(!projectService.isValidDate(to_date)){
                const errorMessage =
                    "입력하신 날짜의 형식이 맞지 않습니다. 형식에 맞춰 주세요.";
                return { errorMessage };
            }
        }

        for(const [key, value] of Object.entries(toUpdate)){
            if(!value){
                delete toUpdate[key];
                continue;
            }
            
            if(key === "from_date"){
                delete toUpdate[key];
                toUpdate["fromDate"] = new Date(value);
            }

            if(key === "to_date"){
                delete toUpdate[key];
                toUpdate["toDate"] = new Date(value);
            }
        }
        project = await Project.update({ project_id, toUpdate });
        const modifiedProject = projectService.refineDateFields(project);
        return modifiedProject;
    }

    static async getProjectList({ user_id }){
        const projects = await Project.findAll({ user_id });
        
        if(projects.length === 0){
            const errorMessage =
             "해당하는 user_id가 없어 Projectlist를 줄 수 없습니다."
            return { errorMessage };
        }

        const modifiedProjects = projects.map(project => {
            const modifiedProject = projectService.refineDateFields(project);
            return modifiedProject;
        })

        return modifiedProjects;

    }

    static async deleteProject({ project_id }){
        const project = await Project.deleteById({ project_id });

        if(!project){
            const errorMessage =
            "해당 프로젝트가 존재하지 않습니다.";
            return { errorMessage };
        }

        const modifiedProject = projectService.refineDateFields(project);
        return modifiedProject;
    }
}

export { projectService };