import { database } from "$core/database/Database";

export interface MainRole {
    roleId: string;
    category: string;
}

export const roleCollection = database.collection<MainRole>("mainrole");