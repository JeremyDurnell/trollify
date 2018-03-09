import React from "react";
import ReactDOM from "react-dom";
import RecommendationPreview from "../components/RecommendationPreview";
import renderer from "react-test-renderer";

const recommendations = [{ name: "test" }];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <RecommendationPreview recommendations={recommendations} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer
    .create(<RecommendationPreview recommendations={recommendations} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const testApp = renderer
  .create(<RecommendationPreview recommendations={recommendations} />)
  .getInstance();

it("has correct initial state", () => {
  expect(testApp.state.play).toBe(false);
  expect(testApp.state.activeMusicIndex).toBe(0);
});

it("has correct proptype", () => {
  expect(testApp.props.recommendations).toEqual(
    expect.arrayContaining([{ name: "test" }])
  );
});

it("toggles play in state correctly", () => {
  const audioTagMock = {
    play: function() {
      return null;
    },
    pause: function() {
      return null;
    }
  };

  testApp.audioContainer = audioTagMock;
  testApp.handleToggle();
  expect(testApp.state.play).toBe(true);

  testApp.audioContainer = audioTagMock;
  testApp.handleToggle();
  expect(testApp.state.play).toBe(false);
});
