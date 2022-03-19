import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findById({ _id }) {
        const award = await AwardModel.findOne({ _id: _id });
        return award;
    }

    static async findAll({ user_id }) {
        const awards = await AwardModel.find({ user_id: user_id });
        return awards;
    }

    static async update({ awardId, fieldToUpdate, newValue }) {
        const filter = { _id: awardId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedaward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedaward;
    }

    static async delete({ awardId }) {
        const ret = await AwardModel.findOneAndDelete({ _id: awardId })
        return ret
    }
}

export { Award };
