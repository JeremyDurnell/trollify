import styled from "react-emotion";

// <----------------------- App.js -----------------------------

export const LandingContainer = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  background-color: #181818;
  color: white;
`;

export const Header = styled("h1")`
  font-weight: bold;
  font-size: 5em;
  border-bottom: 5px solid #1db954;
  margin: 1% 0;
`;

export const SubHeader = styled("h2")`
  font-size: 2em;
  margin: 1% 0;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 1.5em;
  }
`;

export const InputsContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Disclaimer = styled("span")`
  font-size: 0.75em;
  padding-bottom: 5px;
`;

//<------------------------------------- RecommendationPreview.js-----------------------

export const PreviewContainer = styled("div")`
  height: 60vh;
  width: 75%;
  margin: 2vh 5%;
  background-color: black;
  overflow-y: scroll;
`;

export const Greeting = styled("h3")`
  font-weight: bold;
  font-size: 5em;
  margin: 15% 0;
  text-align: center;
`;

// <---------------------------------------------------- Recommendation.js----------------------------

export const RecommendationContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
  border-bottom: 3px solid #181818;

  @media (max-width: 576px) {
    font-size: 0.75em;
  }
`;

export const AlbumArt = styled("img")`
  height: auto;
  width: 25%;
  border-radius: 50%;
  padding: 5px;
`;

export const SongInfo = styled("div")`
  text-align: left;
  width: 60%;
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.25em;

  @media (max-width: 871px) {
    font-size: 0.75em;
  }
`;

export const TrackData = styled("span")`
  font-weight: bold;
  margin-right: 1em;
`;

export const PlayButtonContainer = styled("div")`
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SpotifyLink = styled("a")`
  font-weight: bold;
  text-decoration: none;
  color: #1db954;
`;
