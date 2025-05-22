const remoteServer = 'rollo.altervista.org';
const API_URL = `http://${remoteServer}/api`;

/**automatically build the complete api path from a shortened string
 * without all the repeated parts
 * ```
 * apiPath("/auth/login") -> "https://{HOST}/api/auth/login.php"
 * ```
 */
export const apiPath = (path: string) => `${API_URL}${path}.php`;
