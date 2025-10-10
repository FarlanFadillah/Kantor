
/**
 * Pagination middleware.
 * 
 * This middleware initializes pagination data for routes that return
 * a list of records. It parses the `currentPage` query parameter from
 * the request and calculates pagination values like `limit` and `offset`.
 * 
 * It stores the calculated pagination details in `res.locals` so that
 * subsequent middleware or route handlers can access them.
 * 
 * Example usage:
 * ```js
 * app.get('/users', pagination, async (req, res) => {
 *   const users = await db.query('SELECT * FROM users LIMIT ? OFFSET ?', [
 *     res.locals.limit, 
 *     res.locals.offset
 *   ]);
 *   res.json({ currentPage: res.locals.currentPage, users });
 * });
 * ```
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * 
 * @property {number} res.locals.limit - Number of records per page (default: 10).
 * @property {number} res.locals.offset - Offset calculated from the current page.
 * @property {number} res.locals.currentPage - Current active page number.
 * @property {Array} res.locals.datas - Initialized empty array for storing paginated data.
 */
export function pagination (req, res, next){
    res.locals.datas = []; // where is list of data stored
    let {currentPage} = req.query;

    if(!currentPage || isNaN(currentPage) || currentPage < 1) currentPage = 1;

    // Pagination
    // set the limit for every page
    res.locals.limit = 10;

    // current page offset
    res.locals.offset = (res.locals.limit * currentPage) - res.locals.limit;

    // current page
    res.locals.currentPage = currentPage;

    next();
}