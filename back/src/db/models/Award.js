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

    static async findByQuery(query) {
        const awards = await AwardModel.find(query);
        return awards;
    }

    static async update({ awardId, toUpdate }) {
        const filter = { _id: awardId };
        const update = toUpdate;
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
