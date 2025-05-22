export const createUser = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username';
export const findByUsername = 'SELECT id, password, username FROM users WHERE username = $1';
