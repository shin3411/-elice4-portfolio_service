import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class CertificateService {
    //신규 수상 내역 추가
    static async addCertificate({ user_id, title, description, date }) {
        const newCertificate = { user_id, title, description, date }
        const createdNewCertificate = await Certificate.create({ newCertificate })
        return createdNewCertificate
    }

    //특정 1개의 수상 정보 반환용
    static async getCertificate({ _id }) {

        const certificate = await Certificate.findById({ _id })
        if (certificate.length == 0) {
            const errorMessage =
                "해당 수상내용이 존재하지 않습니다.";
            return { errorMessage };
        }

        return certificate;
    }

    //특정 유저의 모든 수상내역 반환용
    static async getCertificates({ user_id }) {
        const certificates = await Certificate.findAll({ user_id })
        if (certificates.length == 0) {
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
            const errorMessage = "권한이 없어 수정할 수 없습니다. 수정하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        } else {
            certificate = await Certificate.update({ certificateId, toUpdate })
            return certificate
        }
    }

    //특정 1개의 수상 정보 삭제
    static async deleteCertificate({ certificateId, currentUserId }) {
        let certificate = await Certificate.findById({ _id: certificateId })

        if (!certificate) {
            const errorMessage =
                "해당 자격증이 존재하지 않습니다.";
            return { errorMessage };
        }

        if (certificate.user_id !== currentUserId) {
            const errorMessage = "권한이 없어 삭제할 수 없습니다. 삭제하려는 대상이 본인의 것인지 확인해주세요."
            return { errorMessage }
        }
        certificate = await Certificate.delete({ certificateId })

        return certificate;
    }
}

export { CertificateService }
