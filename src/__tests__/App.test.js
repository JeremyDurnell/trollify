import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import App from "../components/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

const testApp = renderer.create(<App />).getInstance();

it("has correct initial state", () => {
  expect(testApp.state.popularityValue).toBe(50);
  expect(testApp.state.selectedGenre).toBe("acoustic");
  expect(testApp.state.recommendations.length).toBe(0);
});
