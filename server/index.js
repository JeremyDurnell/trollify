const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");

// Import controllers
const { getGenres, getRecommendations } = require("./controllers/controller");

const app = express();
app.use(json());
app.use(cors());

app.get("/api/genres", getGenres);
app.get("/api/recommendations/:genre/:popularity", getRecommendations);

const port = 3001;

app.listen(port, () => console.log(`I'm all the way up! Running on: ${port}`));
