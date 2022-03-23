import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import { User } from "../db";

class eduService {
    static async addEdu({ user_id, school, major, position }) {
        if (!user_id || !school || !major || !position) {
            const errorMessage =
                "빠트린 항목이 있습니다. 모두 채워주세요.";
            return { errorMessage };
        }

        const query = {
            userId: user_id,
            school,
            major,
            position,
        }

        const education = await Education.findByQuery(query);
        //학적 중복
        if (education) {
            const errorMessage =
                "중복된 학적입니다. 다른 학적을 입력해 주세요."
            return { errorMessage };
        }
        const id = uuidv4();
        const createdNewEdu = await Education.create({ ...query, id });
        createdNewEdu.errorMessage = null;


        return createdNewEdu;
    }

    static async getEdu({ edu_id }) {
        const education = await Education.findById({ edu_id });

        if (!education) {
            const errorMessage =
                "해당 학적이 존재하지 않습니다.";
            return { errorMessage };
        }

        return education;
    }

    static async setEdu({ edu_id, toUpdate }) {
        // 우선 해당 id 의 학적이 db에 존재하는지 여부 확인
        let education = await Education.findById({ edu_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage =
                "해당 학적이 존재하지 않습니다.";
            return { errorMessage };
        }

        for (const [key, value] of Object.entries(toUpdate)) {
            if (!value) {
                delete toUpdate[key]
            }
        }

        education = await Education.update({ edu_id, toUpdate });
        return education;
    }

    static async getEduList({ user_id }) {
        const educations = await Education.findAll({ user_id });

        if (educations.length === 0) {
            const errorMessage =
                "해당하는 user_id가 없어 Edulist를 줄 수 없습니다."
            return { errorMessage };
        }

        return educations;
    }

    static async deleteEdu({ edu_id }) {
        const education = await Education.deleteById({ edu_id });

        if (!education) {
            const errorMessage =
                "해당 학적이 존재하지 않습니다.";
            return { errorMessage };
        }

        return education;
    }

    static async searchEdu(query) {
        const educations = await Education.findsByQuery(query);

        if (educations.length === 0) {
            const errorMessage =
                "해당하는 학력이 없습니다."
            return { errorMessage };
        }

        return educations;
    }
}

export { eduService };