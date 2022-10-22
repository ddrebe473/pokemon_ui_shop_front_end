const express = require('express');

const port = 3000

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./'))

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
