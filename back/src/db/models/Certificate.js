import { CertificateModel } from "../schemas/certificate";

class Certificate {
    static async create({ newcertificate }) {
        const createdNewcertificate = await certificateModel.create(newcertificate);
        return createdNewcertificate;
    }

    static async findById({ certificate_id }) {
        const certificate = await certificateModel.findOne({ _id: certificate_id });
        return certificate;
    }

    static async findAll({ user_id }) {
        const certificates = await certificateModel.find({ user_id: user_id });
        return certificates;
    }

    static async update({ certificateId, fieldToUpdate, newValue }) {
        const filter = { id: certificateId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await certificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate;
    }
}

export { Certificate };
