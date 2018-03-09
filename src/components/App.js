import React, { Component } from "react";
import styled from "react-emotion";
import axios from "axios";
import { debounce } from "lodash";

import RecommendationPreview from "./RecommendationPreview";

const LandingContainer = styled("div")`
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

const Header = styled("h1")`
  font-weight: bold;
  font-size: 5em;
  border-bottom: 5px solid #1db954;
  margin: 1% 0;
`;

const SubHeader = styled("h2")`
  font-size: 2em;
  margin: 1% 0;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 1.5em;
  }
`;

const InputsContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Disclaimer = styled("span")`
  font-size: 0.75em;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popularityValue: 50,
      selectedGenre: "acoustic",
      recommendations: [],
      genres: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.debouncedGetRecs = debounce(this.getRecommendations, 1000);
  }

  componentDidMount() {
    axios
      .get("/api/genres")
      .then(response => this.setState({ genres: response.data.genres }))
      .catch(console.log);
  }

  handleChange(event, source) {
    if (source === "genre") {
      this.setState({ selectedGenre: event.target.value }, () =>
        this.getRecommendations()
      );
    } else if (source === "popularity") {
      this.setState(
        { popularityValue: event.target.value },
        this.debouncedGetRecs()
      );
    }
  }

  getRecommendations() {
    const { selectedGenre, popularityValue } = this.state;
    this.setState({ loading: true }, () => {
      axios
        .get(`/api/recommendations/${selectedGenre}/${popularityValue}`)
        .then(recommendations => {
          this.setState({
            recommendations: recommendations.data.tracks,
            loading: false
          });
        })
        .catch(console.log);
    });
  }

  render() {
    const genreOptions = this.state.genres ? (
      this.state.genres.map((genre, i) => (
        <option key={i} value={genre}>
          {genre}
        </option>
      ))
    ) : (
      <option>loading</option>
    );

    return (
      <LandingContainer>
        <Header>Trollify</Header>
        <SubHeader>
          Find ridiculous songs to add to your company's Spotify playlist
        </SubHeader>
        <InputsContainer>
          <div>
            <p>Step 1: Select a genre</p>
            <select
              onChange={e => this.handleChange(e, "genre")}
              value={this.state.selectedGenre}
            >
              {genreOptions}
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Step 2: Select the popularity</p>
            <input
              type="range"
              min={1}
              max={99}
              step={1}
              onChange={e => this.handleChange(e, "popularity")}
              value={this.state.popularityValue}
            />
            <span>{this.state.popularityValue}</span>
          </div>
        </InputsContainer>
        <RecommendationPreview
          loading={this.state.loading}
          recommendations={this.state.recommendations}
        />
        <Disclaimer>*Some genres have a popularity cap*</Disclaimer>
      </LandingContainer>
    );
  }
}

export default App;
