import React from "react";
import styled from "react-emotion";

const RecommendationContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
`;

const AlbumArt = styled("img")`
  height: auto;
  width: 25%;
`;

const SongInfo = styled("div")`
  text-align: left;
  width: 60%;
  height: 100%;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Recommendation = ({ recommendation }) => (
  <RecommendationContainer>
    <AlbumArt
      src={
        recommendation.album.images[0].url
          ? recommendation.album.images[0].url
          : "https://avatars1.githubusercontent.com/u/29843005?s=400&u=0fec472ecd3c19b61d7a9233b611e268e7cf8c98&v=4"
      }
      alt="album cover"
    />
    <SongInfo>
      <p>
        <span>TRACK: </span>
        {recommendation.name}
      </p>
      <p>
        <span>ARTIST:</span> {recommendation.artists[0].name}
      </p>
      <p>
        <span>POPULARITY: </span>
        {recommendation.popularity}
      </p>
    </SongInfo>
    <div>
      <a href={recommendation.external_urls.spotify} target="_blank">
        Open in Spotify
      </a>
    </div>
  </RecommendationContainer>
);

export default Recommendation;
