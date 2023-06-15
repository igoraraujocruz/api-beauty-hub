import { createPool } from 'mysql2/promise';

console.log("passou no db")

export const connection = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'BeautyDB',
  port: 3306,
  waitForConnections: true,
});
