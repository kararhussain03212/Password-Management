import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = 'password-management';

const app = express();
const port = 3000;

app.use(cors());
// ✅ Use modern Express body parsing (no body-parser package needed)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//get all the password
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('password');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save all the password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('password');
  const findResult = await collection.insertOne(password);
  res.json({ success: "true", result: findResult });
});

//delete password by id
app.delete('/', async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('password');
  const result = await collection.deleteOne({ id: id });
  res.json({ success: true, result });
});




const startServer = async () => {
  await client.connect();
  console.log('✅ MongoDB connected');

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();