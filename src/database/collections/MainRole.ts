import database from "../Database";

export interface MainRole {
    roleId: string;
    category: string;
}

const roleCollection = database.collection<MainRole>("mainrole");
export default roleCollection;