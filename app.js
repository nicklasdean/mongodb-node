import mysql from "mysql2";
import { MongoClient } from "mongodb";

// Connect to MongoDB
const mongoClient = new MongoClient(process.env.MONGODB_URI); //mongodb://localhost:27017
await mongoClient.connect();
const mongoDB = mongoClient.db(process.env.MONGODB_DATABASE); //pokemon

// Connect to MySQL
const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

async function basicExample() {
    const moves = await mongoDB.collection("moves")
        .find({name: "Headbutt"})
        .toArray();

    console.log(moves)
}
// basicExample();

async function whatMovesCanCharizardUse(){
    //SQL database: Hvilket pokemon ID har charizard?
    //MongoDB: Hvilke moves kan det ID så bruge?

    mysqlConnection.query(
        "SELECT * FROM pokemon WHERE name = ?",
        ["Charizard"],
        (error, results) => {
            const mongoDBresult = mongoDB.collection("moves")
                .find({pokemon_ids:results[0].pokedex_number})
                .toArray()

            console.log(mongoDBresult)
        }
    )
}

whatMovesCanCharizardUse()
