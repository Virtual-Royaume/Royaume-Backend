import { Member, Resolvers } from "$core/interfaces/ServerSchema";
import memberCollection, { getMemberByDiscordId, getMembersWithPoints } from "$core/database/collections/Member";
import { getFields } from "$core/utils/GraphQL";

/**
 * TODO V4
 *
 * This file contains some casts due to the operation of GraphQL which would add a substantial overhead only to fix some types.
 *
 * This will be corrected in a future major version of the project as the point system will be based on the DB for optimization reasons.
*/

const memberQuery: Resolvers["Query"] = {
    members: async(_, __, ___, info) => {
        const fields = getFields(info);

        if (fields["activity.points.count"] || fields["activity.points.progress"]) {
            const members = await memberCollection.find({ isOnServer: true }).toArray();
            const membersWithPoints = await getMembersWithPoints();

            for (const member of members) {
                const points = membersWithPoints.find(m => m._id === member._id)?.points;

                if (!points) continue;

                (member as Member).activity.points = points;
            }

            return members as Member[];
        }

        return await memberCollection.find({ isOnServer: true }).toArray() as Member[];
    },

    member: async(_, { id }, ___, info) => {
        const member = await getMemberByDiscordId(id) as Member;
        const fields = getFields(info);

        if (fields["activity.points.count"] || fields["activity.points.progress"]) {
            const points = (await getMembersWithPoints()).find(m => m._id === id)?.points;

            if (points) {
                member.activity.points = points;

                return member;
            }

            return member;
        }

        return member;
    }
};

export default memberQuery;