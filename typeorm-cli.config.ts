import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// טוען את משתני הסביבה מקובץ ה-.env שלך
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.PG_PORT || '5432', 10),
  username: process.env.PG_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/*.entity{.ts,.js}'], // מוצא את הישויות אוטומטית
  migrations: ['src/migrations/*{.ts,.js}'], // המקום בו יישמרו המיגרציות
  synchronize: false,
});
