export function getPagination(query: { limit?: string; offset?: string }) {
    const limit = parseInt(query.limit ?? '20', 10);
    const offset = parseInt(query.offset ?? '0', 10);
    return { limit, offset };
}
