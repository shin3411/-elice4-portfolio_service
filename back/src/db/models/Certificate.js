import { CertificateModel } from '../schemas/certificate'

class Certificate {
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static async findById({ _id }) {
        const certificate = await CertificateModel.findOne({ _id: _id });
        return certificate;
    }

    static async findByQuery(query) {
        const certificates = await CertificateModel.find(query);
        return certificates;
    }

    static async update({ certificateId, toUpdate }) {
        const filter = { _id: certificateId };
        const update = toUpdate;
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate;
    }

    static async delete({ certificateId }) {
        const ret = await CertificateModel.findOneAndDelete({ _id: certificateId })
        return ret
    }
}

export { Certificate };
