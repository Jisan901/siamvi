const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8440;

const uri = "mongodb+srv://Jisan2:nByvJIVGfNRgfJd2@cluster0.ahnhiyc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const cCollection = client.db('Siamvi').collection('comments');
        app.get('/',(req,res)=>{
            res.sendFile(__dirname+'/web.html')
        })
        app.post('/api/v1/comments',async (req,res)=>{
            const result = await cCollection.insertOne(req.body)
            res.send(result)
        })
        app.get('/api/v1/comments',async (req,res)=>{
            const com = cCollection.find({})
            res.send(await com.toArray())
        })
        app.get('/delete/:title',async (req,res)=>{
            const result = await cCollection.deleteOne({'title':req.params.title});
            res.send(result)
        })
    } finally{
        
    }
}

run().catch(err=>console.error(err))

app.listen(port,()=>{
    console.log('server running on',port)
});