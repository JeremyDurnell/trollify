const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");

// Import controllers
const { getGenres, getRecommendations } = require("./controllers/controller");

const app = express();

// SERVE FRONTEND
app.use(express.static(`${__dirname}/../build/`));

// Attach Middlewares
app.use(json());
app.use(cors());

// API Endpoints
app.get("/api/genres", getGenres);
app.get("/api/recommendations/:genre/:popularity", getRecommendations);

const port = 3001;

app.listen(port, () => console.log(`I'm all the way up! Running on: ${port}`));

setTimeout(function() {
  process.exit(0);
}, 59 * 60 * 1000);
