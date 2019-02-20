const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const STORAGE_FILENAME = 'store.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function readData() {
    try {
        const file = fs.readFileSync(STORAGE_FILENAME);
        return JSON.parse(file);
    } catch (e) {
        return {};
    }
}

function saveNewData(newData) {
    const data = readData();
    const mergedData = { ...data, ...newData };
    fs.writeFileSync(
        STORAGE_FILENAME,
        JSON.stringify(mergedData),
        { encoding: 'utf8' },
    );
}

app.post('/', (req, res) => {
    const { body } = req;

    saveNewData(body);
    res.send();
});

app.get('/', (req, res) => {
    const data = readData();
    res.send(JSON.stringify(data));
});

app.listen(PORT, () => (
    console.log(`Fake Endpoint is running on http://localhost:${PORT}`)
));
