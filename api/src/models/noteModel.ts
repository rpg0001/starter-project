import { DataTypes, Model } from "sequelize";
import { User } from "./userModel";
import { sequelize } from "../app";

export class Note extends Model {
    declare id: number;
    declare title: string;
    declare content: string;
    declare userId: number;
}

export function initNoteModel() {
    Note.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },
            title: {
                type: DataTypes.STRING,
                field: "title"
            },
            content: {
                type: DataTypes.STRING,
                field: "content"
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id",
                references: {
                    model: User,
                    key: "id",
                }
            },
        },
        { 
            tableName: "notes",
            timestamps: false,
            sequelize 
        }
    )
}