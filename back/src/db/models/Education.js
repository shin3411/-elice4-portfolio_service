import { EducationModel } from "../schemas/education";

class Education {
    static async create( newEdu ){
        const createdNewEdu = await EducationModel.create(newEdu);
        return createdNewEdu;
    }

    static async findById({ edu_id }){
        const findEdu = await EducationModel.findOne({id: edu_id});
        return findEdu;
    }

    static async findByQuery({ userId, school, major, position }){     
        const query = { userId, school, major, position };
        
        const findEdu = await EducationModel.findOne(query);
        
        return findEdu;
    }

    static async findAll({ user_id }){
        const educations = await EducationModel.find({ userId: user_id });

        return educations;
    }

    static async update({ edu_id, toUpdate }){
        const filter = { id: edu_id };
        const option = { returnOriginal: false };

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter, 
            toUpdate,
            option
        );
        return updatedEducation;
    }

    static async deleteById({ edu_id }){
        const findEdu = await EducationModel.findOneAndDelete({id: edu_id});
        return findEdu;
    }
}

export { Education };