const { DataSource }  = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

// https://typeorm.io/docs/guides/usage-with-javascript
const datasource = new DataSource({
    type: 'mysql',
    host: process.env.DATASOURCE_HOST,
    port: process.env.DATASOURCE_PORT,
    username: process.env.DATASOURCE_USERNAME,
    password: process.env.DATASOURCE_PASSWORD,
    database: process.env.DATASOURCE_DATABASE,
    entities: [__dirname + '/../entities/*.js'],
    synchronize: true
})

datasource.initialize();

exports.datasource = datasource;

