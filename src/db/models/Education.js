import { EducationModel } from "../schemas/education";
import { UserModel } from "../schemas/user";

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
        // const userId = userId ?? null;
        // const school = school ?? null;
        // const major = major ?? null;
        // const position = position ?? null;
        
        const query = { userId, school, major, position };
        
        const findEdu = await EducationModel.findOne(query);
        
        return findEdu;
    }

    static async findAll(){
        // const user = await UserModel.findOne({id: user_id}).populate("educations");
        // return user.educations;
        const educations = await EducationModel.find({});
        console.log(educations);
        return educations;
    }

    static async update({ edu_id, fieldToUpdate, newValue }){
        const filter = { id: edu_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter, 
            update,
            option
        );
        return updatedEducation;
    }
}

export { Education };