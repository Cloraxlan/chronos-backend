import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://backend:hamzaIsAMediocreProgrammer@cluster0-97ewx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

export const connection: Promise<MongoClient> = client
  .connect()
  .then((client) => {
    return client;
  });
