import { createPool } from 'mysql2/promise';

console.log("passou no db")

export const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'beautydb',
  port: 3306,
  waitForConnections: true,
});
