require("dotenv").config();
const axios = require("axios");

const authOptions = {
  method: "post",
  url: "https://accounts.spotify.com/api/token",
  headers: {
    // prettier-ignore
    "Authorization":
      "Basic " +
      new Buffer(`${process.env.PUBLISHABLE}:${process.env.SECRET}`).toString(
        "base64"
      ),
    "Content-Type": "application/x-www-form-urlencoded"
  },
  params: {
    grant_type: "client_credentials"
  }
};

// Hit Spotify's API to generate an access token
axios(authOptions)
  .then(res => {
    // Add the access token as a default header for all requests
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + res.data.access_token;
    // axios.defaults.headers.common["Content-Type"] = "application/json";
  })
  .catch(console.log);

const getGenres = (req, res) => {
  axios
    .get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`)
    .then(genres => res.status(200).json(genres.data))
    .catch(err => {
      res.status(500).json("Could not get genres from Spotify");
      console.log(err, req);
    });
};

const getRecommendations = (req, res) => {
  axios
    .get(
      `https://api.spotify.com/v1/recommendations?seed_genres=${
        req.params.genre
      }&target_popularity=${req.params.popularity}`
    )
    .then(recommendations => res.status(200).json(recommendations.data))
    .catch(err => {
      res.status(500).json("Could not get recommendations from Spotify Api");
      console.log(err);
    });
};

module.exports = {
  getGenres,
  getRecommendations
};
