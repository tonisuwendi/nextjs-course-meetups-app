import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://tonsuwendi:kYAaxlRMq96AnPvx@cluster0-shard-00-00.xscsd.mongodb.net:27017,cluster0-shard-00-01.xscsd.mongodb.net:27017,cluster0-shard-00-02.xscsd.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
