import { Education } from "../db";

class eduService {
    static async addEdu({ user_id, school, major, position }){
        const query = {
            userId: user_id,
            school,
            major,
            position,
        }
        const education = await Education.findByQuery(query);
        
        if(education){
            const errorMessage = 
             "중복된 학적입니다. 다른 학적을 입력해 주세요."
            return { errorMessage };
        }

        const createdNewEdu = await Education.create({ query });
        createdNewEdu.errorMessage = null;

        return createdNewEdu;
    }

    static async getEdu({ edu_id }){
        const education = await Education.findById({ edu_id });
        
        if(!education){
            const errorMessage = 
             "해당 학적이 존재하지 않습니다.";
            return { errorMessage };
        }

        return education;
    }

    static async setEdu({ edu_id, toUpdate }){
        // 우선 해당 id 의 학적이 db에 존재하는지 여부 확인
        let education = await User.findById({ edu_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
        const errorMessage =
            "해당 학적이 존재하지 않습니다.";
        return { errorMessage };
        }

        // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.school) {
        const fieldToUpdate = "school";
        const newValue = toUpdate.school;
        education = await Education.update({ _id, fieldToUpdate, newValue });
        }

        if (toUpdate.major) {
        const fieldToUpdate = "major";
        const newValue = toUpdate.major;
        education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }

        if (toUpdate.position) {
        const fieldToUpdate = "position";
        const newValue = toUpdate.position;
        education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }

        return education;
    }

    static async getEduList({ user_id }){
        const educations = Education.findAll();
        const filteredEdu = educations
        .filter(({ userId }) => userId === user_id);

        return filteredEdu;
    }
}

export { eduService };