import { createPool } from 'mysql2/promise';

console.log("passou no db")

export const connection = createPool({
  host: 'containers-us-west-32.railway.app',
  user: 'root',
  password: 'xnNLwGVUn263IKAkKvNm',
  database: 'railway',
  port: 8025,
  waitForConnections: true,
});
