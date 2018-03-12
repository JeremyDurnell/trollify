import React, { Component } from "react";
import styled from "react-emotion";

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
    const { recommendations } = this.props;

    const recommendationsList =
      recommendations.length > 1 ? (
        recommendations.map((recommendation, index) => (
          <Recommendation
            recommendation={recommendation}
            key={recommendation.id}
            index={index}
            handleSelect={this.handleSelect}
            playing={this.state.activeMusicIndex === index && this.state.play}
            previewAvailable={recommendation.preview_url}
          />
        ))
      ) : (
        <Greeting>Hi :)</Greeting>
      );

    const activeMusic =
      recommendations.length > 1 &&
      recommendations[this.state.activeMusicIndex];

    return (
      <PreviewContainer>
        <audio
          preload="none"
          ref={ref => {
            this.audioContainer = ref;
          }}
          src={activeMusic.preview_url}
        />
        {this.props.loading ? <Greeting /> : recommendationsList}
      </PreviewContainer>
    );
  }
}
