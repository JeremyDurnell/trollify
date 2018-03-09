import React from "react";
import ReactDOM from "react-dom";
import Recommendation from "../components/Recommendation";
import renderer from "react-test-renderer";

const recommendation = {
  album: {
    images: ["testimage"]
  },
  name: "testName",
  preview_url: "testurl",
  popularity: 50,
  artists: [{ name: "artist" }],
  external_urls: {
    spotify: "testurlhere"
  }
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Recommendation recommendation={recommendation} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const withPreview = renderer
    .create(
      <Recommendation recommendation={recommendation} previewAvailable={true} />
    )
    .toJSON();
  expect(withPreview).toMatchSnapshot();

  const withoutPreview = renderer
    .create(
      <Recommendation recommendation={recommendation} previewAvailable={null} />
    )
    .toJSON();
  expect(withoutPreview).toMatchSnapshot();

  const playing = renderer
    .create(
      <Recommendation
        recommendation={recommendation}
        previewAvailable={true}
        playing={true}
      />
    )
    .toJSON();
  expect(playing).toMatchSnapshot();

  const paused = renderer
    .create(
      <Recommendation
        recommendation={recommendation}
        previewAvailable={true}
        playing={false}
      />
    )
    .toJSON();
  expect(paused).toMatchSnapshot();
});
