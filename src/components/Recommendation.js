import React from "react";
import styled from "react-emotion";

const RecommendationContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
  border-bottom: 3px solid #181818;
`;

const AlbumArt = styled("img")`
  height: auto;
  width: 25%;
  border-radius: 50%;
`;

const SongInfo = styled("div")`
  text-align: center;
  width: 60%;
  height: 100%;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.25em;
`;

const TrackData = styled("span")`
  font-weight: bold;
  margin-right: 1em;
`;

const PlayButtonContainer = styled("div")`
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpotifyLink = styled("a")`
  font-weight: bold;
  text-decoration: none;
  color: #1db954;
  margin-top: 0.5em;

  &:hover: {
    opacity: 0.5;
  }
`;
const Recommendation = ({ recommendation, index, handleSelect, playing }) => (
  <RecommendationContainer>
    <AlbumArt
      src={
        recommendation.album.images[0]
          ? recommendation.album.images[0].url
          : "https://avatars1.githubusercontent.com/u/29843005?s=400&u=0fec472ecd3c19b61d7a9233b611e268e7cf8c98&v=4"
      }
      alt="album cover"
    />
    <SongInfo>
      <p>
        <TrackData>Title: </TrackData>
        {recommendation.name}
      </p>
      <p>
        <TrackData>Artist:</TrackData> {recommendation.artists[0].name}
      </p>
      <p>
        <TrackData>Popularity: </TrackData>
        {recommendation.popularity}
      </p>
      <SpotifyLink href={recommendation.external_urls.spotify} target="_blank">
        Open in Spotify
      </SpotifyLink>
    </SongInfo>
    <PlayButtonContainer onClick={e => handleSelect(index, e)}>
      <i
        className={playing ? "icon fa fa-pause" : "icon fa fa-play"}
        style={{ fontSize: "3em", cursor: "pointer", color: "#1db954" }}
      />
    </PlayButtonContainer>
  </RecommendationContainer>
);

export default Recommendation;
