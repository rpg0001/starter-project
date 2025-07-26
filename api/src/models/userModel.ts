import { DataTypes, Model } from "sequelize";
import { sequelize } from "../app";

export enum UserType {
    BASIC = "BASIC",
    ADMIN = "ADMIN"
}

export class User extends Model {
    declare id: number;
    declare email: string;
    declare username: string;
    declare passwordHash: string;
    declare userType: UserType;

    getBasic() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            userType: this.userType
        }
    }
}

export function initUserModel() {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },
            email: {
                type: DataTypes.STRING,
                field: "email"
            },
            username: {
                type: DataTypes.STRING,
                field: "username"
            },
            passwordHash: {
                type: DataTypes.STRING,
                field: "password_hash"
            },
            userType: {
                type: DataTypes.STRING,
                field: "user_type"
            },
        },
        { 
            tableName: "users",
            timestamps: false,
            sequelize 
        }
    )
}