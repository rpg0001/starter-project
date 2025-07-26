import { DataTypes, Model } from "sequelize";
import { sequelize } from "../app";
import { User } from "./userModel";

export class UserSession extends Model {
    declare id: number;
    declare token: string;
    declare userId: number;
    declare expiresAt: Date;
    declare createdAt: Date;
}

export function initUserSessionModel() {
    UserSession.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },
            token: {
                type: DataTypes.STRING,
                field: "token"
            },
            expiresAt: {
                type: DataTypes.DATE,
                field: "expires_at"
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "created_at"
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id",
                references: {
                    model: User,
                    key: "id"
                }
            },
        },
        { 
            tableName: "user_sessions",
            timestamps: false,
            sequelize
        }
    )
}