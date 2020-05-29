const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const jsonDBName = "db.json";
const path = require("path");

let app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

let documents = [];

app.use(express.static("static"));

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + "/index.html"));
});

app.post('/rest/contact', async (req, res, next) => {
    const {
        subject,
        group,
        date,
        time,
        comments
    } = req.body
    try {
        documents.unshift({ subject, group, date, time, comments });
        res.status(201).send("Object was saved.");
    } catch (error) {
        next(error);
    }
})

app.get("/rest/contact", async (req, res, next) => {

    try {
        res.status(200).json(JSON.parse(JSON.stringify(documents)));
    } catch (error) {
        next(error);
    }
})

app.get("/rest/contact/:id", async (req, res, next) => {

    const {
        id
    } = req.params;
    try {
        // caut in lista obj cu id, undefine daca nu exista
        myObj = documents[id-1];
        res.status(200).json(JSON.parse(JSON.stringify(myObj)));
    } catch (error) {
        next(error);
    }
})

app.delete("/rest/contact/:id", async (req, res, next) => {

    const {
        id
    } = req.params;
    try {
        const removeIndex = id-1;
        if (removeIndex < documents.length) {
            documents.splice(removeIndex, 1);
            res.status(200).send("Object was deleted.");
        }
        else {
            res.status(202).send("Table duplicate. Find the element in the first rows.");
        }
    } catch (error) {
        next(error);
    }
})

app.put('/rest/contact/:id', async (req, res, next) => {
    const {
        subject,
        group,
        date,
        time,
        comments
    } = req.body

    const {
        id
    } = req.params;

    try {
        // gasim indexul obiectului cu id-ul primit (din lista de documente)
        const index = id - 1;
        documents[index] = { subject, group, date, time, comments };
        res.status(200).send("Object was updated.");
    } catch (error) {
        next(error);
    }
})