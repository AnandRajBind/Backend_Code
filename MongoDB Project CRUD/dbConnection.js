const { mongoClient } = require('mongodb');
const dbConnectionURL = 'mongodb://127.0.0.1:27017';

const client = new mongoClient(dbConnectionURL);

const dbConnection = async () => {
    await client.connect();
    let db = client.db('Project_DB_Name');
    return db;
}
module.exports = { dbConnection };