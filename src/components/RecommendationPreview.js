import React, { Component } from "react";
import styled from "react-emotion";

import Recommendation from "./Recommendation";

const PreviewContainer = styled("div")`
  height: 60vh;
  width: 75%;
  margin: 5vh 5%;
  background-color: black;
  overflow-y: scroll;
`;

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
    this.setState({ activeMusicIndex: 0, play: false }),
      () => {
        this.audioContainer.currentTime = 0;
      };
  }

  render() {
    const { recommendations } = this.props;

    const recommendationsList =
      recommendations.length > 1 &&
      recommendations.map((recommendation, index) => (
        <Recommendation
          recommendation={recommendation}
          key={recommendation.name}
          index={index}
          handleSelect={this.handleSelect}
          playing={this.state.activeMusicIndex === index && this.state.play}
          previewAvailable={recommendation.preview_url}
        />
      ));

    const activeMusic =
      recommendations.length > 1 &&
      recommendations[this.state.activeMusicIndex];

    console.log(activeMusic);

    return (
      <PreviewContainer>
        <audio
          preload="none"
          ref={ref => {
            this.audioContainer = ref;
          }}
          src={activeMusic.preview_url}
        />
        {recommendationsList}
      </PreviewContainer>
    );
  }
}
