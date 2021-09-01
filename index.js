const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const uri =
  "mongodb+srv://bloodAdmin:Blockchai9@cluster0.apc6x.mongodb.net/blood?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const donorCollection = client.db("blood").collection("donor");
  const applicantCollection = client.db("blood").collection("applicant");
  // perform actions on the collection object
  console.log("databese connected");

  app.get("/donor", (req, res) => {
    donorCollection.find().toArray((err, items) => {
      res.send(items);
      console.log("from db", items);
    });
  });

  app.get("/applicant", (req, res) => {
    applicantCollection.find().toArray((err, items) => {
      res.send(items);
      console.log("from db", items);
    });
  });

  app.post("/addDonor", (req, res) => {
    const newDonor = req.body;
    console.log("adding new donor", newDonor);
    donorCollection.insertOne(newDonor).then((result) => {
      console.log("inserted count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/addApplicant", (req, res) => {
    const newApplicant = req.body;
    console.log("adding new donor", newApplicant);
    applicantCollection.insertOne(newApplicant).then((result) => {
      console.log("inserted count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  //   client.close();
});

app.get("/", (req, res) => {
  res.send("This is Blood Bank Server");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
