import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AwardService {
    //신규 수상 내역 추가
    static async addAward({ user_id, title, description }) {
        const newAward = { user_id, title, description }
        const createdNewAward = await Award.create({ newAward })
        createdNewAward.errorMessage = null
        return createdNewAward
    }

    //특정 1개의 수상 정보 반환용
    static async getAward() { }

    //특정 유저의 모든 수상내역 반환용
    static async getAwards() { }

    //특정 1개의 수상 정보 수정
    static async setAwards() { }

}

export { AwardService }