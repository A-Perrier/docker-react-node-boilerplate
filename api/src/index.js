const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let count;

const mongoUrl = process.env.NODE_ENV === 'production' ?
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@db` :
    'mongodb://db';


const client = new MongoClient(mongoUrl);
async function run() {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('CONNEXION DB OK !');
        count = client.db('test').collection('count');
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

const app = express();

app.get('/api/count', (req, res) => {
    count.findOneAndUpdate({}, { $inc: { count: 1 } }, { returnNewDocument: true }).then((doc) => {
        const count = doc.count
        res.status(200).json(count)
    })
})

app.all('*', (req, res) => {
    console.log('not matching')
    res.status(404).end()
})

app.listen(80);