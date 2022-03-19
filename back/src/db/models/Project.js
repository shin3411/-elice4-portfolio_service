import { ProjectModel } from "../schemas/project";

class Project {
    static async create( newProject ){
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }

    static async findById({ project_id }){
        const findProject = await ProjectModel.findOne({id: project_id});
        return findProject;
    }

    static async findByQuery({ userId, title, description, fromDate, toDate }){        
        const query = { userId, title, description, fromDate, toDate };
        
        const findProject = await ProjectModel.findOne(query);
        return findProject;
    }

    static async findAll(){
        const projects = await ProjectModel.find({});
        return projects;
    }

    static async update({ project_id, fieldToUpdate, newValue }){
        const filter = { id: project_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter, 
            update,
            option
        );
        return updatedProject;
    }

    static async deleteById({ project_id }){
        const result = await ProjectModel.findOneAndDelete({ id: project_id });
        return result;
    }
}

export { Project };