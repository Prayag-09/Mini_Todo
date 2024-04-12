import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const insetQuery = `
        INSERT INTO users (username, password, name)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const values = [username, password, name];
    try {
        const res = await client.query(insetQuery, values);
        return res.rows[0];
    } catch (err) {
        console.log('Error while inserting in Users', err);
        throw err;
    }
}

export async function getUser(userId: number) {
    try {
        const res = await client.query(`
            SELECT * FROM users 
            WHERE id = $1
        `, [userId]);
        return res.rows[0];
    } catch (err) {
        console.log('Error while reading in Users', err);
        throw err;
    }
}
