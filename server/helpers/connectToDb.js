import {MongoClient} from "mongodb";

const connectToDatabase = async (collectionName) => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
        const collection = client.db(process.env.DB_NAME).collection(collectionName);
        return { client, collection };
    } catch (err) {
        console.error(err);
        throw new Error('Error connecting to the database');
    }
};

export {connectToDatabase}
