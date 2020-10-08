import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://backend:hamzaIsAMediocreProgrammer@cluster0-97ewx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let c;
let init = async () => {
  c = await client.connect();
};
init();
export const connection: MongoClient = (c as unknown) as MongoClient;
