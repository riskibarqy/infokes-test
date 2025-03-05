import "dotenv/config"; 

export const config = {
    APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};
