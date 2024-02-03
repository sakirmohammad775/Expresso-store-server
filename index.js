const express=require('express') //node.js web application used to build web applications
const cors=require('cors') //Stands for Cross-Origin Resource Sharing. It is a middleware that enables a web server to allow or disallow resources requested by a web page from a different domain.
require('dotenv').config() //for database safety purpose
const { MongoClient, ServerApiVersion } = require('mongodb');


const app=express()//creates a instance of the express app
const port =process.env.PORT || 5000 //This sets the port number for the server. It uses the environment variable PORT if available; otherwise, it defaults to port 5000.

//middleware 
app.use(cors()) //to allow cross-origin requests
app.use(express.json()) // This middleware parses incoming requests with JSON payloads and makes them available under req.body.
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mfnurby.mongodb.net/?retryWrites=true&w=majority`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('coffee making server is running')
})    //define a routes=This sets up a route for the root URL ("/").

app.listen(port,()=>{
    console.log(`coffee server is running on port:${port}`);
})    //This starts the Express server and listens on the specified port. When the server starts, it logs a message to the console.