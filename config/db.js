import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.MSSQL_DATABASE, process.env.DB_USER, process.env.MSSQL_ROOT_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Use the port from the .env file
    dialect: 'mssql', 
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Database Connected`);
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1);
    }
}

const createDatabaseIfNotExists = async () => {
    try {
        await sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${process.env.MSSQL_DATABASE}')
        BEGIN
            CREATE DATABASE [${process.env.MSSQL_DATABASE}]
        END`);
        console.log(`Database checked/created if not exists.`);
    } catch (error) {
        console.error(`Error creating database: ${error.message}`);
        process.exit(1);
    }
};

(async () => {
    await createDatabaseIfNotExists();
    await sequelize.sync({ alter: true });
})();

export { connectDB, sequelize };