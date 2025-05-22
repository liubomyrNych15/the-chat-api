export function getPagination(query) {
    const limit = parseInt(query.limit ?? '20', 10);
    const offset = parseInt(query.offset ?? '0', 10);
    return { limit, offset };
}
