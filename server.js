const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const STORAGE_FILENAME = 'store.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getData() {
    try {
        const file = fs.readFileSync(STORAGE_FILENAME);
        return JSON.parse(file);
    } catch (e) {
        return {};
    }
}

function saveData(data) {
    fs.writeFileSync(
        STORAGE_FILENAME,
        JSON.stringify(data),
        { encoding: 'utf8' },
    );
}

function saveNewData(newData) {
    const data = getData();
    const mergedData = { ...data, ...newData };
    saveData(mergedData);
}

app.post('/', (req, res) => {
    const { body } = req;
    saveNewData(body);
    res.send();
});

app.get('/', (req, res) => {
    const data = getData();
    res.send(JSON.stringify(data));
});

app.delete('/:key', (req, res) => {
    const { key } = req.params;
    const data = getData();
    delete data[key];
    saveData(data);
    res.send();
});

app.listen(PORT, () => (
    console.log(`Fake Endpoint is running on http://localhost:${PORT}`)
));
