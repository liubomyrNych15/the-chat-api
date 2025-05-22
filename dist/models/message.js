export const insertText = "INSERT INTO messages (user_id, type, text_content) VALUES ($1, 'text', $2) RETURNING id, user_id, type, text_content AS content, created_at";
export const insertFile = "INSERT INTO messages (user_id, type, file_name, file_path, mime_type) VALUES ($1, 'file', $2, $3, $4) RETURNING id, user_id, type, file_name, mime_type, created_at";
export const listMessages = "SELECT m.id, u.username, m.type, m.text_content AS content, m.file_name, m.mime_type, m.created_at " +
    "FROM messages m JOIN users u ON m.user_id = u.id " +
    "ORDER BY m.created_at DESC LIMIT $1 OFFSET $2";
export const findMessageById = "SELECT * FROM messages WHERE id = $1";
