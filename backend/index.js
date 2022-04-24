const express = require('express');
const routes = require('./routes');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json())
app.use(routes);
app.use(cors());

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});