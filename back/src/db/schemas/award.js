import { Schema, model } from 'mongoose'

//해당 유저 아이디, 상 이름, 상세 내역
const AwardSchema = new Schema(
    {
        user_id: {
            type: String, required: true,
        },
        title: {
            type: String, required: true
        },
        description: {
            type: String, required: true
        },

    },
    {
        timestamps: true
    }
)

const AwardModel = model('Award', AwardSchema)

export { AwardModel }