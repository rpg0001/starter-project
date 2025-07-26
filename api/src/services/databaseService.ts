import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";

export async function testDatabaseConnection(sequelize: Sequelize) {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}