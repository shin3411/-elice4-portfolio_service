import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class CertificateService {
    //신규 수상 내역 추가
    static async addCertificate({ user_id, title, description, date }) {
        const newCertificate = { user_id, title, description, date }
        const createdNewCertificate = await Certificate.create({ newCertificate })
        createdNewCertificate.errorMessage = null
        return createdNewCertificate
    }

    //특정 1개의 수상 정보 반환용
    static async getCertificate({ _id }) {

        const certificate = await Certificate.findById({ _id })
        if (!certificate) {
            const errorMessage =
                "해당 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        return certificate;
    }

    //특정 유저의 모든 수상내역 반환용
    static async getCertificates({ user_id }) {
        const certificates = await Certificate.findAll({ user_id })
        if (!certificates) {
            const errorMessage =
                "해당 유저의 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        return certificates;
    }

    //특정 1개의 수상 정보 수정
    static async setCertificates({ toUpdate, certificateId, currentUserId }) {
        let certificate = await Certificate.findById({ _id: certificateId })

        if (certificate.user_id !== currentUserId) {
            const errorMessage = "본인거 아니라 권한 없음"
            return { errorMessage }
        } else {
            if (toUpdate.title) {
                const fieldToUpdate = 'title'
                const newValue = toUpdate.title
                certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
            }
            if (toUpdate.description) {
                const fieldToUpdate = 'description'
                const newValue = toUpdate.description
                certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
            }
            if (toUpdate.date) {
                const fieldToUpdate = 'date'
                const newValue = toUpdate.date
                certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
            }

            return certificate
        }
    }

}

export { CertificateService }
