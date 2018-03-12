import React from "react";
import PropTypes from "prop-types";

// Import Styled-Components
import {
  RecommendationContainer,
  AlbumArt,
  SongInfo,
  TrackData,
  PlayButtonContainer,
  SpotifyLink
} from "../styles";

const Recommendation = ({
  recommendation,
  index,
  handleSelect,
  playing,
  previewAvailable
}) => (
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
      <p>
        <SpotifyLink
          href={recommendation.external_urls.spotify}
          target="_blank"
        >
          Open in Spotify
        </SpotifyLink>
      </p>
    </SongInfo>
    <PlayButtonContainer onClick={e => handleSelect(index, e)}>
      {previewAvailable !== null ? (
        <i
          className={playing ? "icon fa fa-pause" : "icon fa fa-play"}
          style={{ fontSize: "3em", cursor: "pointer", color: "#1db954" }}
        />
      ) : (
        "No preview available"
      )}
    </PlayButtonContainer>
  </RecommendationContainer>
);

export default Recommendation;

Recommendation.propTypes = {
  recommendation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  previewAvailable: PropTypes.string
};
