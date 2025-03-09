const express = require('express');
const app = express();

app.use(express.static('/Frontend'));
app.use(express.json())

app.listen(4444, 'localhost', () => {
    console.log("App listening on port 4444");
})

//Custom 404 page
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Congratulations. You searched for a side, which does not exist (404)</h1>');
});