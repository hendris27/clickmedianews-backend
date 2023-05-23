const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
