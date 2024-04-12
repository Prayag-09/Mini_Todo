import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const insertionQuery = `
        INSERT INTO todos (user_id, title, description) 
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const values = [userId, title, description];
    try {
        const res = await client.query(insertionQuery, values);
        return res.rows[0];
    } catch(err) {
        console.log("Error while inserting : ", err);
        throw err;
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try{
        const updateQuery = await client.query(`
            UPDATE todos
            SET done = TRUE
            WHERE id = $1
            RETURNING *
        `, [todoId]);

        return updateQuery.rows[0];
    } catch(err){
        console.log('Error while Updating the todo : ',err);
        throw err;
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const readQuery = `
        SELECT * FROM todos
        WHERE id = $1`;
    try {
        const result = await client.query(readQuery, [userId]);
        return result.rows;
    } catch(err) {
        console.log('Error while reading the todos: ', err);
        throw err;
    }
}