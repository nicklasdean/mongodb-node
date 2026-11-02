import mysql from "mysql2";
import { MongoClient } from "mongodb";

// Connect to MongoDB
const mongoClient = new MongoClient(process.env.MONGODB_URI);
await mongoClient.connect();
const mongoDB = mongoClient.db(process.env.MONGODB_DATABASE);

// Connect to MySQL
const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

async function basicExample() {
    const moves = await mongoDB.collection("moves")
        .find({type: "Normal"})
        .toArray();

    console.log(moves)
}
basicExample();

async function whatMovesCanCharizardUse(){
}

whatMovesCanCharizardUse()