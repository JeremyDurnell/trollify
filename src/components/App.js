import React, { Component } from "react";
import axios from "axios";
import { debounce } from "lodash";

// Import React Components
import RecommendationPreview from "./RecommendationPreview";

// Import Styled-Components
import {
  LandingContainer,
  Header,
  SubHeader,
  InputsContainer,
  Disclaimer,
  DropDown,
  SliderInput
} from "../styles";

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
    this.setState({ loading: true });

    axios
      .get(`/api/recommendations/${selectedGenre}/${popularityValue}`)
      .then(recommendations => {
        this.setState({
          recommendations: recommendations.data.tracks,
          loading: false
        });
      })
      .catch(console.log);
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
            <DropDown
              onChange={e => this.handleChange(e, "genre")}
              value={this.state.selectedGenre}
            >
              {genreOptions}
            </DropDown>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Step 2: Select the popularity</p>
            <SliderInput
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
