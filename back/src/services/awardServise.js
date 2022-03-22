import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class AwardService {
    //신규 수상 내역 추가
    static async addAward({ user_id, title, description }) {
        //중복 처리
        const isUnique = await Award.findByQuery({ user_id, title })
        if (isUnique.length >= 1) {
            const errorMessage =
                "이미 해당 수상내용이 존재합니다.";
            return { errorMessage };
        } else {
            const newAward = { user_id, title, description }
            const createdNewAward = await Award.create({ newAward })
            return createdNewAward
        }
    }

    //특정 1개의 수상 정보 반환용
    static async getAward({ _id }) {

        const award = await Award.findById({ _id })
        if (award.length == 0) {
            const errorMessage =
                "해당 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        return award;
    }

    //특정 유저의 모든 수상내역 반환용
    static async getAwards(query) {
        const awards = await Award.findByQuery(query)
        if (awards.length == 0) {
            const errorMessage =
                "해당 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        return awards;
    }

    //특정 1개의 수상 정보 수정
    static async setAwards({ toUpdate, awardId, currentUserId }) {
        let award = await Award.findById({ _id: awardId })
        let isUnique = await Award.findByQuery({ user_id: currentUserId, title: toUpdate.title, _id: { $ne: awardId } })
        if (award.user_id !== currentUserId) {
            const errorMessage = "권한이 없어 수정할 수 없습니다. 수정하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        }
        else if (isUnique.length >= 1) {
            const errorMessage = "이미 동일한 제목의 수상내용이 존재합니다."
            return { errorMessage }
        }
        else {
            award = await Award.update({ awardId, toUpdate })
            return award
        }
    }

    //특정 1개의 수상 정보 삭제
    static async deleteAward({ awardId, currentUserId }) {
        let award = await Award.findById({ _id: awardId })

        if (!award) {
            const errorMessage =
                "해당 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        if (award.user_id !== currentUserId) {
            const errorMessage = "권한이 없어 삭제할 수 없습니다. 삭제하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        }
        award = await Award.delete({ awardId })

        return award;
    }

}

export { AwardService }