import pg from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { hashSync, genSaltSync, compareSync } from "bcrypt";

const rounds: number = 10;

const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL
});


export async function createUser(user: { password: string, name: string, email: string })
    : Promise<boolean> {

    const salt = genSaltSync(rounds);
    const hash = hashSync(user.password, salt);

    try {

        const result = await pool.query(
            "INSERT INTO users(name, email, password, salt, id) VALUES($1, $2, $3, $4, gen_random_uuid())",
            [user.name, user.email, hash, salt]
        );
        if (result) {
            return true;
        }

        return false;

    }
    catch (error) {
        return false;
    }
};


export async function validateUser(user: { password: string, email: string })
    : Promise<boolean> {

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [user.email]);

    if (result.rowCount === 0) {
        return false;
    }

    // const hash = hashSync(user.password, result.rows[0].salt);
    if (compareSync(user.password,result.rows[0].password)) {
        return true;
    }

    return false;
};

