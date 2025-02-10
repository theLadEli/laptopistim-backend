import knex  from 'knex';
import dotenv from "dotenv";

dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.PGHOST,
        port: 5432,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: { rejectUnauthorized: false, sslmode: 'require' }
    },
});

export default db;