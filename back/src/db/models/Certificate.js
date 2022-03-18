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

    static async findAll({ user_id }) {
        const certificates = await CertificateModel.find({ user_id: user_id });
        return certificates;
    }

    static async update({ certificateId, fieldToUpdate, newValue }) {
        const filter = { _id: certificateId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        console.log(certificateId)
        console.log(updatedCertificate)
        return updatedCertificate;
    }
}

export { Certificate };
