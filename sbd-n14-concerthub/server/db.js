const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'adrien.ardra1811',
    host: 'ep-empty-field-793323.ap-southeast-1.aws.neon.tech',
    database: 'ConcertHub',
    password: 'johw6Ig4qmbt',
    port: 5432,
    sslmode: 'require',
    ssl: true,
});

module.exports = pool;