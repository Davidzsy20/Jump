const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('adf')
    res.send("Hello");

});

const PORT = process.env.PORT;
app.listen(PORT);