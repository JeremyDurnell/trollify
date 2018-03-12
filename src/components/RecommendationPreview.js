import React, { Component } from "react";
import PropTypes from "prop-types";

// Import React Components
import Recommendation from "./Recommendation";

// Import Styled-Components
import { PreviewContainer, Greeting } from "../styles";
export default class RecommendationPreview extends Component {
  constructor(props) {
    super(props);

    this.state = { activeMusicIndex: 0, play: false };

    this.handleSelect = this.handleSelect.bind(this);
    this._playMusic = this._playMusic.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSelect(index, event) {
    event.stopPropagation();

    this.state.activeMusicIndex === index
      ? this.handleToggle()
      : this._playMusic(index);
  }

  _playMusic(index) {
    this.setState(
      {
        activeMusicIndex: index,
        play: true
      },
      () => {
        this.audioContainer.currentTime = 0;
        this.audioContainer.play();
      }
    );
  }

  handleToggle() {
    this.state.play ? this.audioContainer.pause() : this.audioContainer.play();
    this.setState({ play: !this.state.play });
  }

  componentWillReceiveProps(nextProps) {
    this.audioContainer.pause();
    this.setState({ activeMusicIndex: 0, play: false }, () => {
      this.audioContainer.currentTime = 0;
    });
  }

  render() {
    const { recommendations, loading } = this.props;
    const { activeMusicIndex, play } = this.state;
    const greeting = <Greeting>Hi :)</Greeting>;

    const recommendationsList =
      recommendations.length > 1
        ? recommendations.map((recommendation, index) => (
            <Recommendation
              recommendation={recommendation}
              key={recommendation.id}
              index={index}
              handleSelect={this.handleSelect}
              playing={activeMusicIndex === index && play}
              previewAvailable={recommendation.preview_url}
            />
          ))
        : greeting;

    const activeMusic =
      recommendations.length > 1 && recommendations[activeMusicIndex];

    return (
      <PreviewContainer>
        <audio
          preload="none"
          ref={ref => {
            this.audioContainer = ref;
          }}
          src={activeMusic.preview_url}
        />
        {loading ? greeting : recommendationsList}
      </PreviewContainer>
    );
  }
}

RecommendationPreview.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
};
