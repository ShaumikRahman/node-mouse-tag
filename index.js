const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use('/', express.static('public'));
app.use('/about', express.static('public/about.html'));

// app.get('/', (req, res) => {
//     res.send('test');
// })

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})