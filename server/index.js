const initDatabase = require('./config/database');
const routes = require('./routes');
const express = require('express');
const app = express();

app.use(routes);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
initDatabase()
    .then(() => console.log('Database working!'))
    .catch((e) => console.log('Database Error: ' + e))