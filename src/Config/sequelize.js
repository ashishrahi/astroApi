// config/sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected via Sequelize'))
  .catch((err) => console.error('❌ DB connection error:', err));


export default sequelize;
