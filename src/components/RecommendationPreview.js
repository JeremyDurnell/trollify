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

    this.state = {
      activeMusic: ""
    };
  }

  render() {
    const recommendations =
      this.props.recommendations.length > 1 &&
      this.props.recommendations.map(recommendation => (
        <Recommendation
          recommendation={recommendation}
          key={recommendation.name}
        />
      ));
    return <PreviewContainer>{recommendations}</PreviewContainer>;
  }
}
