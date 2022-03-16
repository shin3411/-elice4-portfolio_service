import { Schema, model } from "mongoose";

// db에서 생성되는 object id인 _id를 고유식별자로 사용합니다
// 그래서 user와 달리 id가 없습니다 

const CertificateSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }

);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
